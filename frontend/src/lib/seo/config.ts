/**
 * SEO Infrastructure — Central Configuration
 *
 * This is the single source of truth for all default SEO values.
 * Priority cascade: DB record → Admin settings → This config (lowest priority)
 *
 * Update these values before deploying to production. Sensitive verification
 * tokens should be placed in environment variables (see .env.example).
 */

import type { SeoConfig } from './types';

// ─── Environment helpers ──────────────────────────────────────────────────────

const isProd = process.env.NODE_ENV === 'production';

/** Canonical production domain — confirmed by user */
export const CANONICAL_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (isProd ? 'https://saifulislam.vercel.app' : 'http://localhost:3000');

// ─── Global SEO Config ───────────────────────────────────────────────────────

export const SEO_CONFIG: SeoConfig = {
  siteName: 'Saiful Islam',

  // Used when a page has no custom title
  defaultTitle: 'Saiful Islam | Principal MERN Stack Engineer & Full Stack Architect',

  // Template applied to all page titles. %s = page-specific title
  titleTemplate: '%s | Saiful Islam',

  defaultDescription:
    'Senior MERN Stack Developer & Next.js Specialist. Expert in scalable SaaS applications, ' +
    'high-performance web apps, AI platforms, and custom Node.js solutions.',

  defaultKeywords: [
    'saif.code',
    'saif developer',
    'saif mern stack developer',
    'best developer in pakistan',
    'best developer in kpk',
    'Mern stack developer islamabad',
    'Mern stack developer peshawar',
    'MERN stack developer',
    'full stack engineer',
    'Next.js developer',
    'MongoDB expert',
    'SaaS development',
    'React engineer',
    'Node.js developer',
    'TypeScript developer',
    'software architect',
    'portfolio',
  ],

  defaultAuthor: 'Saiful Islam',

  // BCP-47 language tag
  language: 'en',

  locale: 'en_US',

  // Default robots directive for public pages
  defaultRobots: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },

  canonicalDomain: CANONICAL_DOMAIN,

  // Default Open Graph / Twitter sharing image
  // Update this path after uploading your OG image to /public
  defaultOgImage: `${CANONICAL_DOMAIN}/og-image.png`,

  // Twitter/X Card handle — update to real handle when available
  twitterHandle: '@saifuldev',

  // Facebook App ID — optional, leave empty if not used
  facebookAppId: '',

  organizationName: 'Saiful Islam',

  // Logo URL — pulled dynamically from Admin media library.
  // This static value is the fallback when admin settings are unavailable.
  organizationLogoUrl: `${CANONICAL_DOMAIN}/logo.png`,

  themeColor: '#00f5ff',
};

// ─── Page-level SEO Defaults ──────────────────────────────────────────────────
// These are used as fallbacks when DB record is not found for a specific path.

export const PAGE_SEO_DEFAULTS = {
  home: {
    title: 'Saiful Islam | Principal MERN Stack Architect',
    description:
      'Senior MERN Stack Engineer specializing in SaaS application development, scalable web applications, and AI-powered platforms.',
    keywords: ['saif.code', 'saif developer', 'saif mern stack developer', 'best developer in pakistan', 'best developer in kpk', 'Mern stack developer islamabad', 'Mern stack developer peshawar', 'portfolio', 'MERN stack', 'software architect', 'full stack developer'],
  },

  about: {
    title: 'About Me | System Architect & Full Stack Developer',
    description:
      'Senior MERN stack developer and System Architect. Learn about my engineering principles, architecture strategies, and professional experience.',
    keywords: ['about', 'developer', 'engineer', 'system architect', 'MERN stack'],
  },

  blog: {
    title: 'Engineering Blog | The Nexus Logs',
    description:
      'Deep-dives into distributed systems, full-stack performance tuning, AI-native architecture, and modern web engineering.',
    keywords: [
      'tech blog',
      'engineering blog',
      'MERN tutorials',
      'system design',
      'AI architecture',
    ],
  },

  store: {
    title: 'Developer Store | Premium Code & Templates',
    description:
      'Enterprise-grade Next.js templates, SaaS boilerplates, and React UI components. Production-ready code for serious developers.',
    keywords: ['developer store', 'code templates', 'SaaS boilerplate', 'Next.js template'],
  },

  projects: {
    title: 'Projects Portfolio | Architectural Case Studies',
    description:
      'A collection of high-concurrency systems, micro-services, and enterprise-grade products built with the MERN stack.',
    keywords: ['projects', 'case studies', 'portfolio', 'MERN projects', 'web applications'],
  },

  contact: {
    title: 'Contact | Initiate Project Handshake',
    description:
      'Connect with a Senior MERN Stack Developer for enterprise SaaS, e-commerce, and high-performance system architecture.',
    keywords: ['contact', 'hire developer', 'freelance developer', 'project inquiry'],
  },

  checkout: {
    title: 'Secure Checkout | Developer Store',
    description: 'Complete your purchase securely.',
    keywords: [],
  },
} as const;

// ─── Robots Directives ────────────────────────────────────────────────────────

/** Pages that should NEVER be indexed by search engines */
export const NOINDEX_PATHS = [
  '/admin',
  '/checkout',
  '/api',
  '/(admin)',
  '/(auth)',
  '/(customer)',
] as const;

/** Pages that should be indexed but with nofollow */
export const NOFOLLOW_PATHS: string[] = [];

// ─── Sitemap Configuration ───────────────────────────────────────────────────

export const SITEMAP_CONFIG = {
  static: [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/store', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
  ],
  dynamic: {
    blogPost: { priority: 0.8, changeFrequency: 'weekly' as const },
    product: { priority: 0.8, changeFrequency: 'weekly' as const },
    project: { priority: 0.7, changeFrequency: 'monthly' as const },
    category: { priority: 0.6, changeFrequency: 'monthly' as const },
    tag: { priority: 0.5, changeFrequency: 'monthly' as const },
  },
} as const;

// ─── Structured Data Context ──────────────────────────────────────────────────

export const SCHEMA_CONTEXT = 'https://schema.org' as const;

// ─── hreflang Configuration ───────────────────────────────────────────────────
// Currently English-only. Add entries here as new languages are added.

export const HREFLANG_CONFIG = [
  { hreflang: 'en', href: CANONICAL_DOMAIN },
  { hreflang: 'x-default', href: CANONICAL_DOMAIN },
] as const;
