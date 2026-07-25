import { BlogPost } from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch blog post');
    }
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}
