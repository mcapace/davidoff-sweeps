import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { insertSweepstakesEntry } from '@/lib/sweepstakes-entries';

const SWEEPSTAKES_START = new Date('2025-11-13T00:00:00-05:00'); // November 13, 2025 12:00 AM ET
const SWEEPSTAKES_END = new Date('2025-12-14T23:59:59-05:00'); // December 14, 2025 11:59:59 PM ET

export async function POST(request: NextRequest) {
  try {
    // Step 1: Validate environment variables FIRST
    if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      console.error('[500] Missing Supabase environment variables:', {
        hasUrl: !!process.env.SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_ANON_KEY,
        hasPublicKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      });
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Step 2: Safely parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('[400] Invalid JSON:', error);
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    const { email, firstName, lastName, dateOfBirth, state, verificationToken } = body || {};

    // Step 3: Validate required fields
    if (!email || !firstName || !lastName || !dateOfBirth || !state || !verificationToken) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Step 4: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Step 5: Check sweepstakes dates
    const now = new Date();
    if (now < SWEEPSTAKES_START) {
      return NextResponse.json(
        {
          error: 'The sweepstakes begins on November 13, 2025 at 12:00 AM ET. Please check back then to enter.',
        },
        { status: 400 }
      );
    }

    if (now > SWEEPSTAKES_END) {
      return NextResponse.json(
        {
          error: 'The sweepstakes ended on December 14, 2025 at 11:59:59 PM ET. Thank you for your interest.',
        },
        { status: 400 }
      );
    }

    // Step 6: Validate age (must be 21+)
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date of birth format.' },
        { status: 400 }
      );
    }

    const age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    const dayDiff = now.getDate() - birthDate.getDate();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < 21) {
      return NextResponse.json(
        { error: 'You must be 21 years or older to enter.' },
        { status: 400 }
      );
    }

    // Step 7: Validate US state
    const validStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
    ];
    
    if (!validStates.includes(state.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid state. Must be a valid US state or DC.' },
        { status: 400 }
      );
    }

    // Step 8: Initialize Supabase client with error handling
    let supabase;
    try {
      supabase = createClient();
    } catch (clientError: any) {
      console.error('[500] Failed to create Supabase client:', clientError);
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 500 }
      );
    }

    // Step 9: Verify email token with error handling
    let verificationData;
    try {
      const { data, error: verificationError } = await supabase
        .from('email_verifications')
        .select('id, email, expires_at, used')
        .eq('token', verificationToken)
        .eq('email', email)
        .single();

      if (verificationError) {
        console.error('[400] Verification error:', verificationError);
        // PGRST116 is "not found" - meaning invalid token
        if (verificationError.code === 'PGRST116') {
          return NextResponse.json(
            { error: 'Invalid verification token. Please verify your email again.' },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { error: 'Error verifying token. Please try again.' },
          { status: 500 }
        );
      }

      if (!data) {
        return NextResponse.json(
          { error: 'Invalid verification token. Please verify your email again.' },
          { status: 400 }
        );
      }

      verificationData = data;
    } catch (verifyError: any) {
      console.error('[500] Exception during verification:', verifyError);
      return NextResponse.json(
        { error: 'An error occurred while verifying your email. Please try again.' },
        { status: 500 }
      );
    }

    // Step 10: Check if token is used or expired
    if (verificationData.used) {
      return NextResponse.json(
        { error: 'This verification token has already been used.' },
        { status: 400 }
      );
    }

    const expiresAt = new Date(verificationData.expires_at);
    if (expiresAt < now) {
      return NextResponse.json(
        { error: 'Verification token has expired. Please verify your email again.' },
        { status: 400 }
      );
    }

    // Step 11: Check for duplicate entries with error handling
    try {
      const { data: existingEntry, error: checkError } = await supabase
        .from('sweepstakes_entries')
        .select('id')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" which is expected for new entries
        console.error('[500] Error checking for existing entry:', checkError);
        return NextResponse.json(
          { error: 'An error occurred while processing your entry. Please try again.' },
          { status: 500 }
        );
      }

      if (existingEntry) {
        return NextResponse.json(
          { error: 'You have already entered this sweepstakes. Only one entry per email address is allowed.' },
          { status: 400 }
        );
      }
    } catch (checkError: any) {
      console.error('[500] Exception checking for duplicates:', checkError);
      return NextResponse.json(
        { error: 'An error occurred while checking your entry. Please try again.' },
        { status: 500 }
      );
    }

    // Step 12: Insert entry using helper function with error handling
    try {
      const entryData = {
        email,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        state: state.toUpperCase(),
        verification_token: verificationToken,
      };

      const entry = await insertSweepstakesEntry(entryData);

      if (!entry) {
        console.error('[500] insertSweepstakesEntry returned null/undefined');
        return NextResponse.json(
          { error: 'Failed to submit entry. Please try again.' },
          { status: 500 }
        );
      }

      // Step 13: Mark verification token as used (don't fail if this fails)
      try {
        const { error: updateError } = await supabase
          .from('email_verifications')
          .update({ used: true, used_at: new Date().toISOString() })
          .eq('id', verificationData.id);

        if (updateError) {
          console.error('[Warning] Error marking verification as used:', updateError);
          // Don't fail the request - entry is already submitted
        }
      } catch (updateError: any) {
        console.error('[Warning] Exception marking verification as used:', updateError);
        // Continue - entry is already submitted
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Your entry has been submitted successfully!',
          entryId: entry.id,
        },
        { status: 200 }
      );
    } catch (insertError: any) {
      console.error('[500] Error inserting entry:', insertError);
      return NextResponse.json(
        { error: 'An error occurred while submitting your entry. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Catch-all for any unexpected errors
    console.error('[500] Unexpected error in sweepstakes entry:', error);
    console.error('Error stack:', error?.stack);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

