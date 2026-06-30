import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const cookieName = 'cs_session';

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET은 32자 이상이어야 합니다.');
  return new TextEncoder().encode(secret);
}

export type SessionUser = {
  id: string;
  login_id: string;
  display_name: string;
  role: 'admin' | 'staff';
};

export async function createSession(user: SessionUser) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secretKey());

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as SessionUser;
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(cookieName);
}
