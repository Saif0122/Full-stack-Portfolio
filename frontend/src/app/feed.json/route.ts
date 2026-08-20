import { NextResponse } from 'next/server';
import { CANONICAL_DOMAIN, SEO_CONFIG } from '@/lib/seo/config';

export const revalidate = 3600; // Cache for 1 hour

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function safeFetch<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { 
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000) 
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const posts = await safeFetch<any>(`${API_BASE}/posts?status=published&limit=50`);
  const projects = await safeFetch<any>(`${API_BASE}/v1/projects?status=published&limit=50`);
  
  // Merge and sort by date descending
  const allItems = [
    ...posts.map(p => ({ ...p, type: 'blog' })),
    ...projects.map(p => ({ ...p, type: 'projects' }))
  ].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SEO_CONFIG.siteName,
    home_page_url: CANONICAL_DOMAIN,
    feed_url: `${CANONICAL_DOMAIN}/feed.json`,
    description: SEO_CONFIG.defaultDescription,
    language: 'en-US',
    items: allItems.map(item => ({
      id: `${CANONICAL_DOMAIN}/${item.type}/${item.slug}`,
      url: `${CANONICAL_DOMAIN}/${item.type}/${item.slug}`,
      title: item.title,
      summary: item.excerpt || item.summary || item.description,
      date_published: new Date(item.publishedAt || item.createdAt).toISOString(),
    }))
  };

  return NextResponse.json(jsonFeed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
