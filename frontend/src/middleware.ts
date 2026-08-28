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
  
  // Generate CSP Nonce
  const nonce = crypto.randomUUID();
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src 'self' data: blob: https://picsum.photos https://images.unsplash.com https://unsplash.com;
    font-src 'self' fonts.gstatic.com;
    connect-src 'self' generativelanguage.googleapis.com https://full-stack-portfolio-1-m5b1.onrender.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const applyHeaders = (res: NextResponse) => {
    res.headers.set('Content-Security-Policy', cspHeader);
    return res;
  };
  
  // 1. Dynamic Redirects & 410 Engine
  const redirects = await getRedirects();
  const match = redirects.find(r => r.source === pathname);
  
  if (match) {
    if (match.statusCode === 410) {
      // Rewrite to custom 410 page without changing URL in browser
      return applyHeaders(NextResponse.rewrite(new URL('/410', request.url), { request: { headers: requestHeaders } }));
    }
    // 301, 302, 307, 308 redirects
    return applyHeaders(NextResponse.redirect(new URL(match.destination, request.url), match.statusCode));
  }

  // 2. Authentication Guards
  const token = request.cookies.get('jwt')?.value || request.cookies.get('refreshToken')?.value;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isAdminPage = pathname.startsWith('/admin');

  if (isAuthPage && token) {
    return applyHeaders(NextResponse.redirect(new URL('/admin', request.url)));
  }

  if (isAdminPage) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return applyHeaders(NextResponse.redirect(url));
    }
    const decoded = decodeJwt(token);
    if (!decoded || decoded.role !== 'admin') {
      return applyHeaders(NextResponse.redirect(new URL('/login', request.url)));
    }
  }

  return applyHeaders(NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  }));
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
