/**
 * JSON-LD Schema — SoftwareApplication (Project Case Studies)
 * Used on individual project pages.
 * Enables rich results for software projects with tech stack and links.
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT, SEO_CONFIG } from '../config';

export interface ProjectSchemaOptions {
  title: string;
  description: string;
  slug: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  datePublished?: string;
}

export function buildProjectSchema(opts: ProjectSchemaOptions) {
  const projectUrl = `${CANONICAL_DOMAIN}/projects/${opts.slug}`;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'SoftwareApplication',
    '@id': projectUrl,
    name: opts.title,
    description: opts.description,
    url: projectUrl,
    image: opts.image ?? SEO_CONFIG.defaultOgImage,
    applicationCategory: 'WebApplication',
    applicationSubCategory: opts.category ?? 'Full Stack Application',
    featureList: opts.technologies?.join(', '),
    operatingSystem: 'Web Browser',
    ...(opts.liveUrl ? { sameAs: [opts.liveUrl] } : {}),
    ...(opts.githubUrl ? { codeRepository: opts.githubUrl } : {}),
    datePublished: opts.datePublished,
    author: {
      '@type': 'Person',
      name: SEO_CONFIG.defaultAuthor,
      url: `${CANONICAL_DOMAIN}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${CANONICAL_DOMAIN}/#organization`,
      name: SEO_CONFIG.organizationName,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    inLanguage: SEO_CONFIG.language,
  };
}
