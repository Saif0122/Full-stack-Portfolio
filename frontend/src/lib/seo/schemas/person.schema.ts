/**
 * JSON-LD Schema — Person + ProfilePage
 * Used on the Home page and About page to tell Google about the professional identity.
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT, SEO_CONFIG } from '../config';

export interface PersonSchemaOptions {
  name?: string;
  url?: string;
  description?: string;
  jobTitle?: string;
  image?: string;
  sameAs?: string[];          // Social profile URLs
  worksFor?: { name: string; url?: string };
  knowsAbout?: string[];
  alumniOf?: string[];
}

export function buildPersonSchema(opts: PersonSchemaOptions = {}) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Person',
    name: opts.name ?? SEO_CONFIG.defaultAuthor,
    url: opts.url ?? CANONICAL_DOMAIN,
    description: opts.description ?? SEO_CONFIG.defaultDescription,
    jobTitle: opts.jobTitle ?? 'Principal MERN Stack Engineer & Full Stack Architect',
    image: opts.image ?? SEO_CONFIG.defaultOgImage,
    sameAs: opts.sameAs ?? [
      'https://github.com/Saif0122',
      'https://linkedin.com/in/saifulislam',
    ],
    worksFor: opts.worksFor ?? {
      '@type': 'Organization',
      name: SEO_CONFIG.organizationName,
    },
    knowsAbout: opts.knowsAbout ?? [
      'Node.js',
      'React',
      'Next.js',
      'MongoDB',
      'TypeScript',
      'Express.js',
      'MERN Stack',
      'SaaS Architecture',
      'System Design',
      'AI Platforms',
    ],
  };
}

export function buildProfilePageSchema(opts: PersonSchemaOptions = {}) {
  const person = buildPersonSchema(opts);
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ProfilePage',
    mainEntity: {
      ...person,
      '@context': undefined, // remove context from nested entity
    },
    url: `${CANONICAL_DOMAIN}/about`,
    name: `About ${opts.name ?? SEO_CONFIG.defaultAuthor}`,
    description: opts.description ?? SEO_CONFIG.defaultDescription,
    inLanguage: SEO_CONFIG.language,
    dateModified: new Date().toISOString(),
  };
}
