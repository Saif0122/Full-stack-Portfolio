/**
 * SEO Infrastructure — SEO Data Service (Frontend)
 *
 * Responsible for fetching SEO configuration from the backend API.
 * Applies the priority cascade: DB record → Admin settings → Static defaults.
 *
 * All functions are safe to call in Next.js server components (they use
 * the Node.js fetch with appropriate cache settings).
 */

import type { SeoOptions, DbSeoRecord } from './types';
import { SEO_CONFIG, PAGE_SEO_DEFAULTS, CANONICAL_DOMAIN } from './config';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';

// ─── Fetch Helpers ────────────────────────────────────────────────────────────

/**
 * Fetch a single SEO record by path from the backend.
 * Returns null gracefully if the backend is offline or path not found.
 */
export async function fetchPathSeoConfig(path: string): Promise<DbSeoRecord | null> {
  try {
    const res = await fetch(
      `${API_BASE}/seo/config?path=${encodeURIComponent(path)}`,
      { 
        next: { revalidate: 300 }, // cache for 5 minutes
        signal: AbortSignal.timeout(5000) // Fail fast during Vercel build if backend is asleep
      }  
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch the global SEO defaults from the backend (GLOBAL_DEFAULTS record).
 */
export async function fetchGlobalSeoConfig(): Promise<DbSeoRecord | null> {
  return fetchPathSeoConfig('GLOBAL_DEFAULTS');
}

/**
 * Fetch the Admin branding settings to get the organization logo URL.
 * Falls back to the static config logo URL.
 */
export async function fetchOrganizationLogoUrl(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/settings/branding_logo`, {
      next: { revalidate: 3600 }, // cache for 1 hour
      signal: AbortSignal.timeout(5000) // Fail fast during Vercel build
    });
    if (!res.ok) return SEO_CONFIG.organizationLogoUrl ?? `${CANONICAL_DOMAIN}/logo.png`;
    const json = await res.json();
    return json.data?.value ?? SEO_CONFIG.organizationLogoUrl ?? `${CANONICAL_DOMAIN}/logo.png`;
  } catch {
    return SEO_CONFIG.organizationLogoUrl ?? `${CANONICAL_DOMAIN}/logo.png`;
  }
}

// ─── Priority Cascade Merger ──────────────────────────────────────────────────

/**
 * Merges SEO data from three layers in priority order:
 *  1. DB record (highest priority — set via Admin Dashboard)
 *  2. Admin settings key (seo_meta)
 *  3. Static page defaults (lowest priority — hardcoded fallback)
 *
 * Returns a complete SeoOptions object ready to pass into generatePageMetadata().
 */
export function mergeSeoOptions(
  dbRecord: DbSeoRecord | null,
  staticDefaults: Partial<SeoOptions>,
  path: string
): SeoOptions {
  // Title: DB → static
  const title =
    dbRecord?.metaTitle ||
    staticDefaults.title ||
    SEO_CONFIG.defaultTitle;

  // Description: DB → static
  const description =
    dbRecord?.metaDescription ||
    staticDefaults.description ||
    SEO_CONFIG.defaultDescription;

  // Keywords: DB → static → global
  const keywords =
    (dbRecord?.keywords?.length ? dbRecord.keywords : null) ||
    staticDefaults.keywords ||
    SEO_CONFIG.defaultKeywords;

  // OG Image: DB → static → global default
  const ogImageUrl =
    dbRecord?.openGraph?.image ||
    (staticDefaults.og?.images?.[0]?.url) ||
    SEO_CONFIG.defaultOgImage;

  // Canonical: DB → generated
  const canonicalUrl = dbRecord?.canonicalUrl || undefined;

  // noindex / nofollow: DB → static
  const noindex = dbRecord?.noIndex ?? staticDefaults.noindex ?? false;
  const nofollow = dbRecord?.noFollow ?? staticDefaults.nofollow ?? false;
  
  // Focus keyword: DB
  const focusKeyword = dbRecord?.focusKeyword || staticDefaults.focusKeyword;

  return {
    title,
    description,
    path: canonicalUrl ? new URL(canonicalUrl).pathname : path,
    keywords,
    focusKeyword,
    noindex,
    nofollow,
    og: {
      title: dbRecord?.openGraph?.title || title,
      description: dbRecord?.openGraph?.description || description,
      type: (dbRecord?.openGraph?.type as 'website' | 'article') || staticDefaults.og?.type || 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      ...staticDefaults.og,
    },
    twitter: {
      card: (dbRecord?.twitterCard?.card as 'summary' | 'summary_large_image') || 'summary_large_image',
      title: dbRecord?.openGraph?.title || title,
      description: dbRecord?.openGraph?.description || description,
      images: [ogImageUrl],
      ...staticDefaults.twitter,
    },
  };
}

// ─── Page-Specific Resolvers ──────────────────────────────────────────────────

/**
 * Resolves full SEO options for the home page.
 * Fetches from DB, falls back to PAGE_SEO_DEFAULTS.home.
 */
export async function resolveHomeSeo(): Promise<SeoOptions> {
  const dbRecord = await fetchPathSeoConfig('/');
  return mergeSeoOptions(dbRecord, {
    title: PAGE_SEO_DEFAULTS.home.title,
    description: PAGE_SEO_DEFAULTS.home.description,
    keywords: [...PAGE_SEO_DEFAULTS.home.keywords],
    og: { type: 'website' },
  }, '/');
}

/**
 * Resolves SEO options for the About page.
 */
export async function resolveAboutSeo(): Promise<SeoOptions> {
  const dbRecord = await fetchPathSeoConfig('/about');
  return mergeSeoOptions(dbRecord, {
    title: PAGE_SEO_DEFAULTS.about.title,
    description: PAGE_SEO_DEFAULTS.about.description,
    keywords: [...PAGE_SEO_DEFAULTS.about.keywords],
  }, '/about');
}

/**
 * Resolves SEO options for the Blog index page.
 */
export async function resolveBlogSeo(): Promise<SeoOptions> {
  const dbRecord = await fetchPathSeoConfig('/blog');
  return mergeSeoOptions(dbRecord, {
    title: PAGE_SEO_DEFAULTS.blog.title,
    description: PAGE_SEO_DEFAULTS.blog.description,
    keywords: [...PAGE_SEO_DEFAULTS.blog.keywords],
  }, '/blog');
}

/**
 * Resolves SEO options for the Store index page.
 */
export async function resolveStoreSeo(): Promise<SeoOptions> {
  const dbRecord = await fetchPathSeoConfig('/store');
  return mergeSeoOptions(dbRecord, {
    title: PAGE_SEO_DEFAULTS.store.title,
    description: PAGE_SEO_DEFAULTS.store.description,
    keywords: [...PAGE_SEO_DEFAULTS.store.keywords],
  }, '/store');
}

/**
 * Resolves SEO options for the Projects index page.
 */
export async function resolveProjectsSeo(): Promise<SeoOptions> {
  const dbRecord = await fetchPathSeoConfig('/projects');
  return mergeSeoOptions(dbRecord, {
    title: PAGE_SEO_DEFAULTS.projects.title,
    description: PAGE_SEO_DEFAULTS.projects.description,
    keywords: [...PAGE_SEO_DEFAULTS.projects.keywords],
  }, '/projects');
}
