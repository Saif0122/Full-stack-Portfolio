import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Module-level cache for Edge functions
let cachedRedirects: { source: string; destination: string; statusCode: number }[] = [];
let lastFetch = 0;
const CACHE_TTL = 60000; // 60 seconds

function decodeJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

async function getRedirects() {
  const now = Date.now();
  if (now - lastFetch > CACHE_TTL) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800);

      const res = await fetch(`${apiUrl}/redirects/active`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          cachedRedirects = json.data;
          lastFetch = now;
        }
      }
    } catch (e) {
      // Gracefully fail if backend is sleeping or times out.
      // Update lastFetch to avoid stalling every request for 60s.
      lastFetch = now;
    }
  }
  return cachedRedirects;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 1. Dynamic Redirects & 410 Engine
  const redirects = await getRedirects();
  const match = redirects.find(r => r.source === pathname);
  
  if (match) {
    if (match.statusCode === 410) {
      // Rewrite to custom 410 page without changing URL in browser
      return NextResponse.rewrite(new URL('/410', request.url));
    }
    // 301, 302, 307, 308 redirects
    return NextResponse.redirect(new URL(match.destination, request.url), match.statusCode);
  }

  // 2. Authentication Guards
  const token = request.cookies.get('jwt')?.value || request.cookies.get('refreshToken')?.value;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isAdminPage = pathname.startsWith('/admin');

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (isAdminPage) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    const decoded = decodeJwt(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, media, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|media).*)',
  ],
};
