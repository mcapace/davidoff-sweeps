import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addEntry, hasEmailEntered } from '@/lib/sweepstakes-entries';
import { trackEvent } from '@/lib/analytics';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
import { generateVerificationToken } from '@/lib/email-verification';
import { VerificationEmail } from '@/lib/email-templates';

// Validation schema
const sweepstakesEntrySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  agreeToRules: z.boolean().refine(val => val === true, {
    message: 'You must agree to the official rules',
  }),
  agreeToEmails: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if sweepstakes is currently active
    const now = new Date();
    const startDate = new Date('2024-11-13T00:00:00-05:00'); // Nov 13, 2024 12:00 AM ET
    const endDate = new Date('2024-12-31T23:59:59-05:00'); // Dec 31, 2024 11:59:59 PM ET
    
    if (now < startDate) {
      return NextResponse.json(
        { 
          error: 'Sweepstakes not started',
          message: 'The sweepstakes begins on November 13, 2024 at 12:00 AM ET. Please check back then to enter.'
        },
        { status: 400 }
      );
    }
    
    if (now > endDate) {
      return NextResponse.json(
        { 
          error: 'Sweepstakes ended',
          message: 'The sweepstakes ended on December 31, 2024 at 11:59:59 PM ET. Thank you for your interest.'
        },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = sweepstakesEntrySchema.parse(body);

    // Check if email already entered (skip for test email)
    const TEST_EMAIL = process.env.TEST_EMAIL || 'mcapace@mshanken.com';
    const isTestEmail = validatedData.email.toLowerCase() === TEST_EMAIL.toLowerCase();
    
    if (!isTestEmail) {
      const emailExists = await hasEmailEntered(validatedData.email);
      if (emailExists) {
        return NextResponse.json(
          { 
            error: 'Already entered',
            message: 'This email address has already been entered in the sweepstakes. Only one entry per person is allowed.'
          },
          { status: 400 }
        );
      }
    }

    // Validate age (must be 21+)
    const birthDate = new Date(validatedData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 21 || (age === 21 && monthDiff < 0)) {
      return NextResponse.json(
        { 
          error: 'Age requirement not met',
          message: 'You must be 21 years or older to enter this sweepstakes.'
        },
        { status: 400 }
      );
    }

    // Get IP address for fraud prevention
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Add entry to storage
    const entry = await addEntry({
      ...validatedData,
      ipAddress,
    });

    // Track the sweepstakes entry
    await trackEvent({
      type: 'sweepstakes_entry',
      ipAddress,
      userAgent: request.headers.get('user-agent') || undefined,
      metadata: {
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      },
    });

    // Generate email verification token
    const verificationToken = await generateVerificationToken(validatedData.email);
    const origin = request.headers.get('origin') || request.nextUrl.origin;
    const verificationUrl = `${origin}/api/verify-email?token=${encodeURIComponent(verificationToken)}`;

    // Send verification email
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: validatedData.email,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: 'Confirm Your Email - Davidoff Sweepstakes',
        react: VerificationEmail({
          verificationUrl,
          recipientEmail: validatedData.email,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the entry if email fails
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Entry submitted! Please check your email to verify your address and get your sweepstakes confirmation.',
        entryId: entry.id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Sweepstakes entry error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

