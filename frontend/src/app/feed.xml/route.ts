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

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await safeFetch<any>(`${API_BASE}/posts?status=published&limit=50`);
  const projects = await safeFetch<any>(`${API_BASE}/v1/projects?status=published&limit=50`);
  
  // Merge and sort by date descending
  const allItems = [
    ...posts.map(p => ({ ...p, type: 'blog' })),
    ...projects.map(p => ({ ...p, type: 'projects' }))
  ].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  const rssItems = allItems.map(item => {
    const url = `${CANONICAL_DOMAIN}/${item.type}/${item.slug}`;
    const pubDate = new Date(item.publishedAt || item.createdAt).toUTCString();
    const title = escapeXml(item.title || '');
    const description = escapeXml(item.excerpt || item.summary || item.description || '');

    return `
      <item>
        <title>${title}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${pubDate}</pubDate>
        <description>${description}</description>
      </item>
    `;
  }).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(SEO_CONFIG.siteName)}</title>
        <link>${CANONICAL_DOMAIN}</link>
        <description>${escapeXml(SEO_CONFIG.defaultDescription)}</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${CANONICAL_DOMAIN}/feed.xml" rel="self" type="application/rss+xml"/>
        ${rssItems}
      </channel>
    </rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
