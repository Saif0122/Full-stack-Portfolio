import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for the JWT token in cookies
  const token = request.cookies.get('jwt')?.value || request.cookies.get('refreshToken')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  if (isAuthPage && token) {
    // If user is already logged in and tries to access login/register, redirect to dashboard or home
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (isAdminPage && !token) {
    // If user tries to access /admin without a token, redirect to login
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/register'
  ],
};
