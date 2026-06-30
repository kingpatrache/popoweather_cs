import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isLogin = req.nextUrl.pathname.startsWith('/login');
  const hasSession = req.cookies.has('cs_session');
  if (!hasSession && !isLogin && !req.nextUrl.pathname.startsWith('/api/auth/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (hasSession && isLogin) return NextResponse.redirect(new URL('/', req.url));
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
