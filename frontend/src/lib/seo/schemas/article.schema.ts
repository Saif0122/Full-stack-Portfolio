/**
 * JSON-LD Schema — TechArticle / BlogPosting
 * Used on individual blog post pages.
 * Enables Google's Article rich results (author, date, headline, image).
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT, SEO_CONFIG } from '../config';

export interface ArticleSchemaOptions {
  title: string;
  description: string;
  slug: string;
  coverImage?: string;
  authorName?: string;
  authorUrl?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  wordCount?: number;
  readTimeMinutes?: number;
  category?: string;
  isTechnical?: boolean;  // true → TechArticle, false → BlogPosting
}

export function buildArticleSchema(opts: ArticleSchemaOptions) {
  const articleUrl = `${CANONICAL_DOMAIN}/blog/${opts.slug}`;
  const schemaType = opts.isTechnical !== false ? 'TechArticle' : 'BlogPosting';

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': schemaType,
    '@id': articleUrl,
    headline: opts.title,
    description: opts.description,
    url: articleUrl,
    image: {
      '@type': 'ImageObject',
      url: opts.coverImage ?? SEO_CONFIG.defaultOgImage,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: opts.authorName ?? SEO_CONFIG.defaultAuthor,
      url: opts.authorUrl ?? `${CANONICAL_DOMAIN}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${CANONICAL_DOMAIN}/#organization`,
      name: SEO_CONFIG.organizationName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_CONFIG.organizationLogoUrl ?? `${CANONICAL_DOMAIN}/logo.png`,
      },
    },
    datePublished: opts.datePublished ?? new Date().toISOString(),
    dateModified: opts.dateModified ?? opts.datePublished ?? new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: opts.keywords?.join(', '),
    wordCount: opts.wordCount,
    timeRequired: opts.readTimeMinutes ? `PT${opts.readTimeMinutes}M` : undefined,
    articleSection: opts.category,
    inLanguage: SEO_CONFIG.language,
    isAccessibleForFree: true,
  };
}
