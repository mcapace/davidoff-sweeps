import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export interface EmailToken {
  email: string;
  exp: number;
}

/**
 * Generate a verification token that expires in 24 hours
 */
export async function generateVerificationToken(email: string): Promise<string> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(SECRET_KEY);
  
  return token;
}

/**
 * Verify and decode a verification token
 */
export async function verifyToken(token: string): Promise<EmailToken | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    
    // Validate that payload contains email
    if (typeof payload.email === 'string' && typeof payload.exp === 'number') {
      return { email: payload.email, exp: payload.exp };
    }
    
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Note: Email verification status is now stored in the database
 * Use markEmailAsVerified from sweepstakes-entries.ts instead
 */

