import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-here'
);

export interface DownloadToken {
  email: string;
  type: 'recipe-book';
  exp: number;
}

// In-memory store for used tokens (in production, use a database)
const usedTokens = new Set<string>();

/**
 * Generate a secure, one-time download token
 */
export async function generateDownloadToken(email: string): Promise<string> {
  const token = await new SignJWT({ 
    email, 
    type: 'recipe-book',
    random: Math.random().toString(36) // Add randomness to prevent token reuse
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('365d') // Valid for 1 year
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and consume a download token (one-time use)
 */
export async function verifyDownloadToken(token: string): Promise<DownloadToken | null> {
  try {
    // Check if token has already been used
    if (usedTokens.has(token)) {
      console.log('Token already used:', token.substring(0, 20) + '...');
      return null;
    }

    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate payload has required fields
    if (
      typeof payload.email !== 'string' || 
      payload.type !== 'recipe-book' ||
      typeof payload.exp !== 'number'
    ) {
      console.log('Invalid token payload');
      return null;
    }

    // Mark token as used
    usedTokens.add(token);

    // Clean up old tokens periodically (basic memory management)
    if (usedTokens.size > 10000) {
      const tokensArray = Array.from(usedTokens);
      tokensArray.slice(0, 5000).forEach(t => usedTokens.delete(t));
    }

    // Construct and return validated token
    return {
      email: payload.email,
      type: payload.type,
      exp: payload.exp,
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * Check if a token is valid without consuming it
 */
export async function isTokenValid(token: string): Promise<boolean> {
  try {
    if (usedTokens.has(token)) {
      return false;
    }
    
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.type === 'recipe-book' && !!payload.email;
  } catch {
    return false;
  }
}

