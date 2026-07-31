import { BlogPost } from '@/types/blog';
import { BLOG_POSTS } from '@/constants/blog';
import { fetchWithTimeout } from '@/utils/fetch';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn('API returned non-ok status for posts, falling back to static posts.');
      return BLOG_POSTS.map(p => ({ ...p, _isMock: true }));
    }
    const json = await res.json();
    
    // Return DB data if exists, otherwise fallback to static posts
    if (json.data && json.data.length > 0) {
      return json.data;
    }
    return BLOG_POSTS.map(p => ({ ...p, _isMock: true }));
  } catch (error) {
    console.warn('Error fetching blog posts:', error);
    // Fallback to static posts if backend is offline
    return BLOG_POSTS.map(p => ({ ...p, _isMock: true }));
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/posts/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) {
        const mock = BLOG_POSTS.find(p => p.slug === slug);
        return mock ? { ...mock, _isMock: true } : null;
      }
      console.warn('API returned non-ok status for post details, falling back to static post.');
      const mock = BLOG_POSTS.find(p => p.slug === slug);
      return mock ? { ...mock, _isMock: true } : null;
    }
    const json = await res.json();
    
    if (json.data) {
      return json.data;
    }
    const fallback = BLOG_POSTS.find(p => p.slug === slug);
    return fallback ? { ...fallback, _isMock: true } : null;
  } catch (error) {
    console.warn('Error fetching blog post by slug:', error);
    // Fallback to static post if backend is offline
    const fallback = BLOG_POSTS.find(p => p.slug === slug);
    return fallback ? { ...fallback, _isMock: true } : null;
  }
}

