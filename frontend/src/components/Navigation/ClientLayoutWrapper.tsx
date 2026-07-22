"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatWidget } from '../AIChat/ChatWidget';

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
      <ChatWidget />
    </div>
  );
};
