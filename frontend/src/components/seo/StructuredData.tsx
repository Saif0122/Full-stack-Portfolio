import React from 'react';

interface StructuredDataProps {
  type: string;
  id?: string;
  data?: any; // Pre-fetched data or static fallback
}

/**
 * Server component that fetches validated JSON-LD schema from the backend
 * and safely injects it into the DOM.
 */
export async function StructuredData({ type, id, data }: StructuredDataProps) {
  let schemaData = data;

  if (!schemaData) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';
      const url = new URL(`${baseUrl}/schema/generate`);
      url.searchParams.append('type', type);
      if (id) {
        url.searchParams.append('id', id);
      }

      // Next.js native fetch caching (with a short timeout to prevent hanging builds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch(url.toString(), {
        next: { revalidate: 3600, tags: ['schema', type, id || 'global'] },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.validation?.isValid) {
          schemaData = json.data;
        } else if (json.data) {
          // It might be invalid according to strict rules, but we can still inject what we have 
          // or we could choose to return null here. For safety, we inject it.
          schemaData = json.data;
          console.warn(`[StructuredData] Validation issues for ${type}:`, json.validation?.issues);
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || (error.cause && error.cause.code === 'ECONNREFUSED') || error.message === 'fetch failed') {
        console.warn(`[StructuredData] Backend unreachable for schema ${type}. Skipping.`);
      } else {
        console.error(`[StructuredData] Failed to fetch schema for ${type}:`, error.message);
      }
    }
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
