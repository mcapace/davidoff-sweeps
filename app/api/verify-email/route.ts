import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
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

    // Get origin for URLs (if needed for future email templates)
    // const origin = request.headers.get('origin') || request.nextUrl.origin;

    // Send sweepstakes confirmation email
    const { error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: payload.email,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: '🎉 Sweepstakes Entry Confirmed!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; background: #f5f5f4; padding: 20px; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
              
              <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 50px 30px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 32px; font-weight: 300; margin: 0; letter-spacing: -0.5px;">You're Entered!</h1>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 8px 0 0 0;">Email confirmed – Good luck in the sweepstakes!</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <h2 style="color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">Thank You for Confirming!</h2>
                
                <p style="color: #57534e; font-size: 16px; margin: 0 0 16px 0;">
                  Your entry has been confirmed for the Davidoff Sweepstakes.
                </p>
                
                <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 8px; margin: 24px 0;">
                  <p style="font-size: 14px; color: #14532d; margin: 0;">
                    <strong style="color: #15803d; font-size: 15px;">Entry Confirmed:</strong><br>
                    Email: ${payload.email}
                  </p>
                </div>
                
                <p style="color: #57534e; font-size: 15px; margin: 20px 0;">
                  <strong>What's Next?</strong><br>
                  The winner will be randomly selected and notified by email.
                </p>
              </div>
              
              <div style="background: #fafaf9; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #1c1917; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">Davidoff</p>
                <p style="color: #78716c; font-size: 14px; margin: 0;">Thank you for participating!</p>
              </div>
              
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      // Don't fail the verification if welcome email fails
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

