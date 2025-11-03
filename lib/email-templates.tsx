/* eslint-disable @next/next/no-head-element */
import * as React from 'react';

// ============================================
// Verification Email Template
// ============================================

interface VerificationEmailProps {
  verificationUrl: string;
  recipientEmail: string;
}

export function VerificationEmail({
  verificationUrl,
  recipientEmail,
}: VerificationEmailProps) {
  return (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        {`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1c1917;
            background: #f5f5f4;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 50px 30px;
            text-align: center;
          }
          .header-logo {
            height: 45px;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #ffffff;
            font-size: 32px;
            font-weight: 300;
            margin: 0;
            letter-spacing: -0.5px;
          }
          .content { padding: 40px 30px; }
          .content h2 {
            color: #1a1a1a;
            font-size: 26px;
            font-weight: 600;
            margin: 0 0 20px 0;
          }
          .content p {
            color: #57534e;
            font-size: 16px;
            margin: 0 0 16px 0;
          }
          .email-display {
            background: #f5f5f4;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 24px 0;
            text-align: center;
          }
          .email-display strong {
            color: #1c1917;
            font-size: 16px;
            font-weight: 600;
          }
          .cta-container { text-align: center; margin: 32px 0; }
          .verify-button {
            display: inline-block;
            background: #1a1a1a;
            color: #ffffff !important;
            padding: 18px 48px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          .note {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 24px 0;
          }
          .note p {
            font-size: 14px;
            color: #78350f;
            margin: 0;
          }
          .footer {
            background: #fafaf9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer-title {
            color: #1c1917;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 4px 0;
          }
          .footer-subtitle {
            color: #78716c;
            font-size: 14px;
          }
        `}
      </style>
    </head>
    <body>
      <div className="email-container">
        <div className="header">
          <h1>Confirm Your Email</h1>
        </div>
        
        <div className="content">
          <h2>One More Step...</h2>
          
          <p>Thank you for entering the Davidoff Sweepstakes!</p>
          
          <p>To confirm your entry, please verify your email address:</p>
          
          <div className="email-display">
            <strong>{recipientEmail}</strong>
          </div>
          
          <div className="cta-container">
            <a href={verificationUrl} className="verify-button">Confirm Email & Enter Sweepstakes →</a>
          </div>
          
          <div className="note">
            <p><strong>⏰ Important:</strong> This link expires in 24 hours. Click now to confirm your sweepstakes entry!</p>
          </div>
        </div>
        
        <div className="footer">
          <p className="footer-title">Davidoff</p>
          <p className="footer-subtitle">Thank you for participating!</p>
        </div>
      </div>
    </body>
  </html>
  );
}

