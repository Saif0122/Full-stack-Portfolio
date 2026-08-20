/**
 * JSON-LD Schema — Product / SoftwareApplication (Store Items)
 * Used on individual product pages in the digital marketplace.
 * Enables Google's Product rich results (price, rating, availability).
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT, SEO_CONFIG } from '../config';

export interface ProductSchemaOptions {
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  price: number;
  salePrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  technologies?: string[];
  productType?: string;
  version?: string;
  isActive?: boolean;
}

export function buildProductSchema(opts: ProductSchemaOptions) {
  const productUrl = `${CANONICAL_DOMAIN}/store/${opts.slug}`;
  const price = opts.salePrice ?? opts.price;
  const currency = opts.currency ?? 'USD';

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'SoftwareApplication',
    '@id': productUrl,
    name: opts.title,
    description: opts.description,
    url: productUrl,
    image: opts.thumbnail ?? SEO_CONFIG.defaultOgImage,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: opts.productType ?? 'Web Application Template',
    softwareVersion: opts.version ?? '1.0.0',
    featureList: opts.features?.join(', '),
    operatingSystem: 'Web Browser',
    downloadUrl: productUrl,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: opts.isActive !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        '@id': `${CANONICAL_DOMAIN}/#organization`,
        name: SEO_CONFIG.organizationName,
      },
    },
    ...(opts.rating != null && opts.reviewCount != null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: opts.rating.toFixed(1),
            reviewCount: opts.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
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
    inLanguage: SEO_CONFIG.language,
  };
}
