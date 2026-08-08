"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import dynamic from 'next/dynamic';

const FloatingAssistant = dynamic(
  () => import('../AIChat/FloatingAssistant').then((mod) => mod.FloatingAssistant),
  { ssr: false } // Prevent SSR to avoid hydration issues with AI state
);

export const ClientLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Exclude standalone pages (auth, admin dashboard) from the global header, footer, and chat widget
  const isExcludedRoute = 
    pathname?.startsWith('/login') || 
    pathname?.startsWith('/register') || 
    pathname?.startsWith('/admin');

  if (isExcludedRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <FloatingAssistant />
    </div>
  );
};
