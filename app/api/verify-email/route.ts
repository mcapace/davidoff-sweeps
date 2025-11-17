import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/email-verification';
import { markEmailAsVerified } from '@/lib/sweepstakes-entries';
import { getEntryByEmail } from '@/lib/sweepstakes-entries';

export async function GET(request: NextRequest) {
  try {
    // Get token from query params
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/verification-failed?reason=missing-token', request.url)
      );
    }

    // Verify token
    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(
        new URL('/verification-failed?reason=invalid-token', request.url)
      );
    }

    // Mark email as verified in database
    await markEmailAsVerified(payload.email);

    // Get sweepstakes entry
    const entry = await getEntryByEmail(payload.email);
    
    if (!entry) {
      return NextResponse.redirect(
        new URL('/verification-failed?reason=entry-not-found', request.url)
      );
    }


    // Redirect to success page
    const successUrl = new URL('/verification-success', request.url);
    successUrl.searchParams.set('email', payload.email);
    successUrl.searchParams.set('entryId', entry.id);
    
    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(
      new URL('/verification-failed?reason=server-error', request.url)
    );
  }
}

