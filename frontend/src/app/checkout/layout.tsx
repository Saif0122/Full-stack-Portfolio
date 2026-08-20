import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { PAGE_SEO_DEFAULTS } from '@/lib/seo/config';

/**
 * noindex: true on /checkout — intentional decision.
 *
 * EFFECT: Checkout pages are never shown in search results.
 * WHY: Checkout URLs are transactional and session-specific.
 *      If Google indexed them, users would land on an empty
 *      or broken checkout flow with no items in their cart.
 *
 * DISADVANTAGE: None for a checkout page. You WANT this.
 *      There is no SEO value to a checkout page appearing in
 *      search results — it would only confuse users.
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_SEO_DEFAULTS.checkout.title,
  description: PAGE_SEO_DEFAULTS.checkout.description,
  path: '/checkout',
  noindex: true,
  nofollow: true, // Don't follow links from checkout — keep bots out
});

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
