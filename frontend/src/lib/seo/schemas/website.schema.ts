/**
 * JSON-LD Schema — WebSite
 * Provides Google with sitewide information and enables Sitelinks Searchbox.
 * Place in the root layout only (renders once, globally).
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT, SEO_CONFIG } from '../config';

export interface WebSiteSchemaOptions {
  name?: string;
  url?: string;
  description?: string;
  searchUrlTemplate?: string; // e.g. "https://saifulislam.vercel.app/blog?q={search_term_string}"
}

export function buildWebSiteSchema(opts: WebSiteSchemaOptions = {}) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    name: opts.name ?? SEO_CONFIG.siteName,
    url: opts.url ?? CANONICAL_DOMAIN,
    description: opts.description ?? SEO_CONFIG.defaultDescription,
    inLanguage: SEO_CONFIG.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: opts.searchUrlTemplate ?? `${CANONICAL_DOMAIN}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Person',
      name: SEO_CONFIG.defaultAuthor,
      url: CANONICAL_DOMAIN,
    },
  };
}
