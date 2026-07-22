import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/constants/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://saiful.code";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/projects", "/blog", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  }));

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
