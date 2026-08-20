import { CANONICAL_DOMAIN } from './config';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Generates JSON-LD schema for a BreadcrumbList.
 * @param items Array of breadcrumb items (name and relative path).
 * @returns JSON-LD object for BreadcrumbList.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const cleanDomain = CANONICAL_DOMAIN.replace(/\/$/, '');

  const itemListElement = items.map((crumb, index) => {
    const cleanPath = crumb.item.startsWith('/') ? crumb.item : `/${crumb.item}`;
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${cleanDomain}${cleanPath}`
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}
