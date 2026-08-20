import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { PAGE_SEO_DEFAULTS } from '@/lib/seo/config';

/**
 * noindex: true on /contact — intentional decision.
 *
 * EFFECT: Google will NOT show this page in search results.
 * WHY: Contact pages with exposed email forms attract spam bots
 *      that discover form targets via Google. Most legitimate users
 *      reach this page through navigation, not search.
 *
 * DISADVANTAGE: You lose organic traffic for queries like "hire [your name]"
 * or "contact [your name]". If you want that traffic, set noindex to false
 * in Admin Dashboard → SEO → Path Config → /contact.
 *
 * The page remains crawlable (follow: true), so any links you
 * place on the contact page still pass PageRank to external sites.
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_SEO_DEFAULTS.contact.title,
  description: PAGE_SEO_DEFAULTS.contact.description,
  path: '/contact',
  noindex: true,   // Do not show in Google Search
  nofollow: false, // But DO follow outbound links
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
