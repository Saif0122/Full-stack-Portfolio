import type { MetadataRoute } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo/config';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';

export const revalidate = 3600; // Revalidate robots.txt hourly

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Attempt to load Admin-configured robot rules
  try {
    const res = await fetch(`${API_BASE}/settings/seo_vitals`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000)
    });

    if (res.ok) {
      const json = await res.json();
      const vitals = json.data?.value;

      if (vitals?.sitemapEnabled === false) {
        // Admin has disabled the sitemap — return noindex-all rule
        return {
          rules: { userAgent: '*', disallow: '/' },
          sitemap: undefined,
        };
      }
    }
  } catch {
    // Backend offline — fall back to safe static defaults below
  }

  // Default enterprise-grade robots rules
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/(admin)/',
          '/(auth)/',
          '/(customer)/',
          '/checkout/',
          '/_next/',
        ],
        crawlDelay: 1,
      },
      // Explicitly allow Googlebot unrestricted access to CSS/JS for rendering
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
        ],
      },
    ],
    sitemap: `${CANONICAL_DOMAIN}/sitemap.xml`,
    host: CANONICAL_DOMAIN,
  };
}

