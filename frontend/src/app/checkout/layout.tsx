import React from 'react';
import Link from 'next/link';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-8 border-b border-white/10 flex justify-between items-center">
        <Link href="/store" className="text-2xl font-black text-foreground hover:opacity-80 transition-opacity">
          STORE
        </Link>
        <span className="text-sm text-muted-foreground">Secure Checkout</span>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
