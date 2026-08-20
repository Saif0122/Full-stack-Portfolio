/**
 * JSON-LD Schema — Organization
 * Tells Google about the business entity behind the portfolio.
 * The logo URL is fetched from the Admin media library at runtime.
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT, SEO_CONFIG } from '../config';

export interface OrganizationSchemaOptions {
  name?: string;
  url?: string;
  logoUrl?: string;    // Fetched from Admin media library (branding_logo setting)
  description?: string;
  email?: string;
  sameAs?: string[];
  foundingDate?: string;
  areaServed?: string;
}

/**
 * How to verify the Organization logo from Admin Dashboard:
 * 1. Go to Admin Dashboard → Media section
 * 2. Upload your logo (recommended: 112×112px PNG, transparent background)
 * 3. Copy the file URL
 * 4. Go to Admin Dashboard → Settings → Branding → set "branding_logo" key
 * 5. The SEO system automatically reads this key via fetchOrganizationLogoUrl()
 * 6. Verify at: https://search.google.com/structured-data/testing-tool
 *    or: https://validator.schema.org/
 *
 * Note: Google requires the logo to be crawlable and accessible publicly.
 */
export function buildOrganizationSchema(opts: OrganizationSchemaOptions = {}) {
  const logoUrl = opts.logoUrl ?? SEO_CONFIG.organizationLogoUrl ?? `${CANONICAL_DOMAIN}/logo.png`;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    '@id': `${CANONICAL_DOMAIN}/#organization`,
    name: opts.name ?? SEO_CONFIG.organizationName,
    url: opts.url ?? CANONICAL_DOMAIN,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 112,
      height: 112,
    },
    image: logoUrl,
    description: opts.description ?? SEO_CONFIG.defaultDescription,
    email: opts.email,
    sameAs: opts.sameAs ?? [
      'https://github.com/Saif0122',
      'https://linkedin.com/in/saifulislam',
    ],
    foundingDate: opts.foundingDate,
    areaServed: opts.areaServed ?? 'Worldwide',
    knowsAbout: [
      'MERN Stack Development',
      'SaaS Application Architecture',
      'Full Stack Engineering',
      'API Design',
      'Cloud Deployment',
    ],
  };
}
