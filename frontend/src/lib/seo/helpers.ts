/**
 * SEO Infrastructure — Reusable Helper Functions
 *
 * Pure functions that generate Next.js Metadata sub-objects.
 * Each function is strongly typed, composable, and has safe fallbacks.
 *
 * Usage:
 *   import { generateMetadata, generateJsonLd, validateMetadata } from '@/lib/seo/helpers';
 */

import type { Metadata } from 'next';
import type {
  SeoOptions,
  OgOptions,
  TwitterOptions,
  RobotsDirective,
  ValidationResult,
  AlternateEntry,
} from './types';
import { SEO_CONFIG, CANONICAL_DOMAIN, HREFLANG_CONFIG, NOINDEX_PATHS } from './config';

// ─── Title Generation ────────────────────────────────────────────────────────

/**
 * Applies the site title template: "%s | Saiful Islam"
 * If the title already includes the site name, returns as-is.
 */
export function formatTitle(title: string): string {
  if (!title) return SEO_CONFIG.defaultTitle;
  if (title === SEO_CONFIG.siteName) return SEO_CONFIG.defaultTitle;
  if (title.includes(SEO_CONFIG.siteName)) return title;
  return SEO_CONFIG.titleTemplate.replace('%s', title);
}

// ─── Canonical URL ───────────────────────────────────────────────────────────

/**
 * Generates a fully-qualified canonical URL from a path.
 * Ensures no double slashes and always uses the canonical domain.
 */
export function generateCanonical(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const cleanDomain = CANONICAL_DOMAIN.replace(/\/$/, '');
  return `${cleanDomain}${cleanPath}`;
}

// ─── hreflang Alternates ─────────────────────────────────────────────────────

/**
 * Generates hreflang alternate entries for a given path.
 * Currently generates English + x-default.
 * Extend HREFLANG_CONFIG in config.ts to add more languages.
 */
export function generateHreflang(path: string, extras: AlternateEntry[] = []): Record<string, string> {
  const result: Record<string, string> = {};
  for (const entry of HREFLANG_CONFIG) {
    const cleanPath = path === '/' ? '' : path;
    result[entry.hreflang] = `${entry.href}${cleanPath}`;
  }
  for (const extra of extras) {
    result[extra.hreflang] = extra.href;
  }
  return result;
}

// ─── Open Graph ──────────────────────────────────────────────────────────────

/**
 * Generates a fully-populated Open Graph object.
 * Falls back to site-level defaults for all optional fields.
 */
export function generateOpenGraph(opts: OgOptions): Metadata['openGraph'] {
  const images = opts.images?.length
    ? opts.images.map((img) => ({
        url: img.url,
        width: img.width ?? 1200,
        height: img.height ?? 630,
        alt: img.alt ?? opts.title,
        type: img.type,
      }))
    : [
        {
          url: SEO_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ];

  const base: Metadata['openGraph'] = {
    type: opts.type ?? 'website',
    url: opts.url,
    title: opts.title,
    description: opts.description,
    siteName: opts.siteName ?? SEO_CONFIG.siteName,
    locale: opts.locale ?? SEO_CONFIG.locale,
    images,
  };

  // Article-specific OG fields
  if (opts.type === 'article') {
    return {
      ...base,
      type: 'article',
      publishedTime: opts.publishedTime,
      modifiedTime: opts.modifiedTime,
      authors: opts.authors ?? [SEO_CONFIG.defaultAuthor],
      tags: opts.tags ?? [],
      section: opts.section,
    };
  }

  return base;
}

// ─── Twitter Card ────────────────────────────────────────────────────────────

/**
 * Generates a Twitter Card metadata object.
 * Defaults to summary_large_image card type.
 */
export function generateTwitterCard(opts: TwitterOptions): Metadata['twitter'] {
  return {
    card: opts.card ?? 'summary_large_image',
    title: opts.title,
    description: opts.description,
    site: opts.site ?? SEO_CONFIG.twitterHandle,
    creator: opts.creator ?? SEO_CONFIG.twitterHandle,
    images: opts.images?.length
      ? opts.images
      : [SEO_CONFIG.defaultOgImage],
  };
}

// ─── Robots ──────────────────────────────────────────────────────────────────

/**
 * Generates the Next.js robots metadata object.
 * Automatically enforces noindex for paths in NOINDEX_PATHS.
 */
export function generateRobots(
  opts: Partial<RobotsDirective> & { noindex?: boolean; nofollow?: boolean; path?: string }
): Metadata['robots'] {
  const isNoindexPath = opts.path
    ? NOINDEX_PATHS.some((p) => opts.path!.startsWith(p))
    : false;

  const shouldIndex = !opts.noindex && !isNoindexPath && (opts.index ?? true);
  const shouldFollow = !opts.nofollow && (opts.follow ?? true);

  const robots: Metadata['robots'] = {
    index: shouldIndex,
    follow: shouldFollow,
    googleBot: {
      index: shouldIndex,
      follow: shouldFollow,
      'max-snippet': opts.maxSnippet ?? -1,
      'max-image-preview': opts.maxImagePreview ?? 'large',
      'max-video-preview': opts.maxVideoPreview ?? -1,
    },
  };

  if (opts.noarchive) (robots as any).noarchive = true;
  if (opts.nosnippet) (robots as any).nosnippet = true;
  if (opts.noimageindex) (robots as any).noimageindex = true;
  if (opts.notranslate) (robots as any).notranslate = true;

  return robots;
}

// ─── JSON-LD Script Tag ───────────────────────────────────────────────────────

/**
 * Converts a JSON-LD object (or array of objects) to a React-compatible
 * script tag props object for use in Next.js <head>.
 *
 * Usage in layout.tsx or page.tsx:
 *   <script {...generateJsonLdScript(schema)} />
 */
export function generateJsonLdScript(schema: object | object[]): {
  type: string;
  dangerouslySetInnerHTML: { __html: string };
} {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema, null, process.env.NODE_ENV === 'development' ? 2 : 0),
    },
  };
}

// ─── Full Metadata Generator ──────────────────────────────────────────────────

/**
 * Master metadata generator — the primary function to call from every page.
 *
 * Priority cascade applied externally (DB → Admin → Defaults).
 * This function only formats and structures — it does NOT fetch.
 *
 * @example
 * export const metadata = generatePageMetadata({
 *   title: 'Blog',
 *   description: 'Engineering articles',
 *   path: '/blog',
 * });
 */
export function generatePageMetadata(opts: SeoOptions): Metadata {
  const canonicalUrl = generateCanonical(opts.path);
  const resolvedTitle = formatTitle(opts.title);
  const resolvedDescription = opts.description || SEO_CONFIG.defaultDescription;
  const resolvedKeywords = opts.keywords ?? SEO_CONFIG.defaultKeywords;

  const ogOpts: OgOptions = {
    title: opts.og?.title ?? resolvedTitle,
    description: opts.og?.description ?? resolvedDescription,
    url: opts.og?.url ?? canonicalUrl,
    type: opts.og?.type ?? 'website',
    images: opts.og?.images,
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    publishedTime: opts.og?.publishedTime,
    modifiedTime: opts.og?.modifiedTime,
    authors: opts.og?.authors,
    tags: opts.og?.tags,
    section: opts.og?.section,
  };

  const twitterOpts: TwitterOptions = {
    card: opts.twitter?.card ?? 'summary_large_image',
    title: opts.twitter?.title ?? resolvedTitle,
    description: opts.twitter?.description ?? resolvedDescription,
    images: opts.twitter?.images ?? (opts.og?.images?.map((i) => i.url)),
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  };

  const hreflangAlternates = generateHreflang(opts.path, opts.alternates);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    authors: [{ name: opts.author ?? SEO_CONFIG.defaultAuthor }],
    metadataBase: new URL(CANONICAL_DOMAIN),
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: generateOpenGraph(ogOpts),
    twitter: generateTwitterCard(twitterOpts),
    robots: generateRobots({
      ...SEO_CONFIG.defaultRobots,
      ...opts.robots,
      noindex: opts.noindex,
      nofollow: opts.nofollow,
      path: opts.path,
    }),
    other: {
      ...(SEO_CONFIG.facebookAppId ? { 'fb:app_id': SEO_CONFIG.facebookAppId } : {}),
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { 'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
    },
  };
}

// ─── Metadata Validation ──────────────────────────────────────────────────────

/**
 * Validates SEO options and returns a list of issues.
 * Run this in dev/CI to catch SEO regressions early.
 *
 * Checks:
 * - Title: present, 30–60 chars
 * - Description: present, 50–160 chars
 * - Keywords: at least 1
 * - OG image: present and non-empty
 * - Canonical: valid URL format
 */
export function validateMetadata(opts: Partial<SeoOptions>): ValidationResult[] {
  const issues: ValidationResult[] = [];

  // ── Title ──────────────────────────────────
  if (!opts.title) {
    issues.push({
      type: 'missing_title',
      severity: 'error',
      message: 'Page title is missing. Every page must have a unique title.',
      field: 'title',
      path: opts.path,
    });
  } else {
    if (opts.title.length < 30) {
      issues.push({
        type: 'title_too_short',
        severity: 'warning',
        message: `Title "${opts.title}" is too short (${opts.title.length} chars). Aim for 30–60 characters.`,
        field: 'title',
        path: opts.path,
      });
    }
    if (opts.title.length > 60) {
      issues.push({
        type: 'title_too_long',
        severity: 'warning',
        message: `Title "${opts.title}" is too long (${opts.title.length} chars). Keep it under 60 characters.`,
        field: 'title',
        path: opts.path,
      });
    }
  }

  // ── Description ────────────────────────────
  if (!opts.description) {
    issues.push({
      type: 'missing_description',
      severity: 'error',
      message: 'Meta description is missing. Every page needs a description (50–160 chars).',
      field: 'description',
      path: opts.path,
    });
  } else {
    if (opts.description.length < 50) {
      issues.push({
        type: 'description_too_short',
        severity: 'warning',
        message: `Description is too short (${opts.description.length} chars). Aim for 50–160 characters.`,
        field: 'description',
        path: opts.path,
      });
    }
    if (opts.description.length > 160) {
      issues.push({
        type: 'description_too_long',
        severity: 'warning',
        message: `Description is too long (${opts.description.length} chars). Keep it under 160 characters.`,
        field: 'description',
        path: opts.path,
      });
    }
  }

  // ── Keywords ───────────────────────────────
  if (!opts.keywords || opts.keywords.length === 0) {
    issues.push({
      type: 'missing_keywords',
      severity: 'info',
      message: 'No keywords specified. While not a direct ranking factor, keywords help categorise content.',
      field: 'keywords',
      path: opts.path,
    });
  }

  // ── OG Image ───────────────────────────────
  const hasOgImage = opts.og?.images && opts.og.images.length > 0 && opts.og.images[0].url;
  if (!hasOgImage) {
    issues.push({
      type: 'missing_og_image',
      severity: 'warning',
      message: 'Open Graph image is missing. Social share cards will use the default site image.',
      field: 'og.images',
      path: opts.path,
    });
  }

  // ── Canonical ──────────────────────────────
  if (opts.path) {
    const canonical = generateCanonical(opts.path);
    try {
      const url = new URL(canonical);
      if (!url.hostname) throw new Error('No hostname');
    } catch {
      issues.push({
        type: 'missing_canonical',
        severity: 'error',
        message: `Canonical URL "${canonical}" is not a valid absolute URL.`,
        field: 'canonical',
        path: opts.path,
      });
    }
  }

  return issues;
}
