import type { MetadataRoute } from 'next';
import { CANONICAL_DOMAIN, SITEMAP_CONFIG } from '@/lib/seo/config';

export const revalidate = 3600; // Revalidate sitemap every hour

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type SitemapEntry = MetadataRoute.Sitemap[number];

async function safeFetch<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static Routes ──────────────────────────────────────────────────
  const staticRoutes: SitemapEntry[] = SITEMAP_CONFIG.static.map(({ path, priority, changeFrequency }) => ({
    url: `${CANONICAL_DOMAIN}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // ── Dynamic Blog Posts ─────────────────────────────────────────────
  const posts = await safeFetch<any>(`${API_BASE}/posts?status=published&limit=500`);
  const blogRoutes: SitemapEntry[] = posts
    .filter((p: any) => p.slug && !p.noIndex)
    .map((post: any) => ({
      url: `${CANONICAL_DOMAIN}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt || Date.now()),
      changeFrequency: SITEMAP_CONFIG.dynamic.blogPost.changeFrequency,
      priority: SITEMAP_CONFIG.dynamic.blogPost.priority,
    }));

  // ── Dynamic Products ───────────────────────────────────────────────
  const products = await safeFetch<any>(`${API_BASE}/products?isActive=true&limit=500`);
  const productRoutes: SitemapEntry[] = products
    .filter((p: any) => p.slug)
    .map((product: any) => ({
      url: `${CANONICAL_DOMAIN}/store/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: SITEMAP_CONFIG.dynamic.product.changeFrequency,
      priority: SITEMAP_CONFIG.dynamic.product.priority,
    }));

  // ── Dynamic Projects ───────────────────────────────────────────────
  const projects = await safeFetch<any>(`${API_BASE}/v1/projects?status=published&limit=200`);
  const projectRoutes: SitemapEntry[] = projects
    .filter((p: any) => p.slug)
    .map((project: any) => ({
      url: `${CANONICAL_DOMAIN}/projects/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: SITEMAP_CONFIG.dynamic.project.changeFrequency,
      priority: SITEMAP_CONFIG.dynamic.project.priority,
    }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...productRoutes,
    ...projectRoutes,
  ];
}

