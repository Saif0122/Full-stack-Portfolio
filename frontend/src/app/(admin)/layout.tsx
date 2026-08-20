import React from 'react';

// Force all admin dashboard routes to be dynamically rendered.
// Admin pages require real-time data and authentication, so they should 
// never be statically generated (SSG) at build time. This also prevents 
// Vercel build timeouts caused by attempting to pre-render these routes.
export const dynamic = 'force-dynamic';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
