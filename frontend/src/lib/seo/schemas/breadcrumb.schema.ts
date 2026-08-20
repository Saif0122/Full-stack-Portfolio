/**
 * JSON-LD Schema — BreadcrumbList
 * Reusable schema for navigation breadcrumbs.
 * Enables Google's breadcrumb rich results in SERPs.
 *
 * Usage:
 *   buildBreadcrumbSchema([
 *     { name: 'Home', path: '/' },
 *     { name: 'Blog', path: '/blog' },
 *     { name: 'My Post Title', path: '/blog/my-post' },
 *   ])
 */

import { CANONICAL_DOMAIN, SCHEMA_CONTEXT } from '../config';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${CANONICAL_DOMAIN}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

// ─── Pre-built Breadcrumb Factories ──────────────────────────────────────────

export function blogPostBreadcrumb(postTitle: string, slug: string) {
  return buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: postTitle, path: `/blog/${slug}` },
  ]);
}

export function productBreadcrumb(productTitle: string, slug: string, category?: string) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/store' },
  ];
  if (category) {
    items.push({ name: category, path: `/store?category=${category}` });
  }
  items.push({ name: productTitle, path: `/store/${slug}` });
  return buildBreadcrumbSchema(items);
}

export function projectBreadcrumb(projectTitle: string, slug: string) {
  return buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: projectTitle, path: `/projects/${slug}` },
  ]);
}
