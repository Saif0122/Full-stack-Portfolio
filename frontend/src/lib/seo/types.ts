/**
 * SEO Infrastructure — TypeScript Types
 * All shared interfaces for the modular SEO system.
 */

import type { Metadata } from 'next';

// ─── Core Config Types ──────────────────────────────────────────────────────

export interface SeoConfig {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;      // e.g. "%s | Saiful Islam"
  defaultDescription: string;
  defaultKeywords: string[];
  defaultAuthor: string;
  language: string;           // e.g. "en"
  defaultRobots: RobotsDirective;
  canonicalDomain: string;    // e.g. "https://saifulislam.vercel.app"
  defaultOgImage: string;
  twitterHandle: string;      // e.g. "@saifuldev"
  facebookAppId?: string;
  organizationName: string;
  organizationLogoUrl?: string;  // pulled from admin media library
  themeColor?: string;
  locale?: string;
}

// ─── Robots ─────────────────────────────────────────────────────────────────

export interface RobotsDirective {
  index: boolean;
  follow: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  notranslate?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}

// ─── Open Graph ──────────────────────────────────────────────────────────────

export interface OgOptions {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article' | 'profile' | 'book';
  images?: OgImage[];
  siteName?: string;
  locale?: string;
  // Article-specific
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  section?: string;
}

export interface OgImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

// ─── Twitter Card ────────────────────────────────────────────────────────────

export interface TwitterOptions {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  images?: string[];
  site?: string;    // @handle
  creator?: string; // @handle
}

// ─── Canonical + hreflang ────────────────────────────────────────────────────

export interface AlternateEntry {
  hreflang: string;
  href: string;
}

// ─── SEO Options (unified input for generateMetadata) ───────────────────────

export interface SeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  author?: string;
  og?: Partial<OgOptions>;
  twitter?: Partial<TwitterOptions>;
  robots?: Partial<RobotsDirective>;
  noindex?: boolean;
  nofollow?: boolean;
  alternates?: AlternateEntry[];
  pagination?: {
    prev?: string;
    next?: string;
  };
  jsonLd?: object | object[];
}

// ─── Validation ──────────────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning' | 'info';

export type ValidationIssueType =
  | 'missing_title'
  | 'title_too_short'
  | 'title_too_long'
  | 'duplicate_title'
  | 'missing_description'
  | 'description_too_short'
  | 'description_too_long'
  | 'missing_canonical'
  | 'canonical_mismatch'
  | 'missing_og_image'
  | 'invalid_robots'
  | 'missing_keywords';

export interface ValidationResult {
  type: ValidationIssueType;
  severity: ValidationSeverity;
  message: string;
  field: string;
  path?: string;
}

// ─── JSON-LD Schema Types ────────────────────────────────────────────────────

export type SchemaType =
  | 'WebSite'
  | 'ProfilePage'
  | 'Organization'
  | 'TechArticle'
  | 'BlogPosting'
  | 'Product'
  | 'SoftwareApplication'
  | 'BreadcrumbList'
  | 'ItemList';

// ─── DB SEO Record (matches backend Seo model) ───────────────────────────────

export interface DbSeoRecord {
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitterCard?: {
    card?: string;
    site?: string;
    creator?: string;
  };
  structuredData?: object;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  sitemapPriority?: number;
  redirectUrl?: string;
  redirectType?: number;
  isBrokenLink?: boolean;
  schemaType?: SchemaType;
  validationIssues?: ValidationResult[];
  updatedAt?: string;
}

// ─── SEO Module export shape ──────────────────────────────────────────────────

export interface SeoModule {
  config: SeoConfig;
  generateMetadata: (opts: SeoOptions) => Metadata;
  generateCanonical: (path: string) => string;
  validateMetadata: (opts: Partial<SeoOptions>) => ValidationResult[];
}
