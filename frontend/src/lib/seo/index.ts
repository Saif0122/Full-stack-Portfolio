/**
 * SEO Infrastructure — Module Index
 *
 * Clean re-exports for the entire SEO module.
 * Import from '@/lib/seo' to access everything.
 *
 * @example
 * import { generatePageMetadata, generateCanonical, buildArticleSchema } from '@/lib/seo';
 */

// Config
export { SEO_CONFIG, CANONICAL_DOMAIN, PAGE_SEO_DEFAULTS, SITEMAP_CONFIG, HREFLANG_CONFIG, NOINDEX_PATHS } from './config';

// Types
export type {
  SeoConfig,
  SeoOptions,
  OgOptions,
  OgImage,
  TwitterOptions,
  RobotsDirective,
  AlternateEntry,
  ValidationResult,
  ValidationIssueType,
  ValidationSeverity,
  SchemaType,
  DbSeoRecord,
  SeoModule,
} from './types';

// Helpers
export {
  formatTitle,
  generateCanonical,
  generateHreflang,
  generateOpenGraph,
  generateTwitterCard,
  generateRobots,
  generateJsonLdScript,
  generatePageMetadata,
  validateMetadata,
} from './helpers';

// Service (server-side data fetching)
export {
  fetchPathSeoConfig,
  fetchGlobalSeoConfig,
  fetchOrganizationLogoUrl,
  mergeSeoOptions,
  resolveHomeSeo,
  resolveAboutSeo,
  resolveBlogSeo,
  resolveStoreSeo,
  resolveProjectsSeo,
} from './service';

// JSON-LD Schemas
export { buildWebSiteSchema } from './schemas/website.schema';
export { buildPersonSchema, buildProfilePageSchema } from './schemas/person.schema';
export { buildOrganizationSchema } from './schemas/organization.schema';
export { buildArticleSchema } from './schemas/article.schema';
export { buildProductSchema } from './schemas/product.schema';
export { buildProjectSchema } from './schemas/project.schema';
export {
  buildBreadcrumbSchema,
  blogPostBreadcrumb,
  productBreadcrumb,
  projectBreadcrumb,
} from './schemas/breadcrumb.schema';
