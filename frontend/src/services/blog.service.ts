import { BlogPost } from '@/types/blog';
import { BLOG_POSTS } from '@/constants/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn('API returned non-ok status for posts, falling back to static posts.');
      return BLOG_POSTS;
    }
    const json = await res.json();
    
    // Return DB data if exists, otherwise fallback to static posts
    if (json.data && json.data.length > 0) {
      return json.data;
    }
    return BLOG_POSTS;
  } catch (error) {
    console.warn('Error fetching blog posts:', error);
    // Fallback to static posts if backend is offline
    return BLOG_POSTS;
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) {
        return BLOG_POSTS.find(p => p.slug === slug) || null;
      }
      console.warn('API returned non-ok status for post details, falling back to static post.');
      return BLOG_POSTS.find(p => p.slug === slug) || null;
    }
    const json = await res.json();
    
    if (json.data) {
      return json.data;
    }
    return BLOG_POSTS.find(p => p.slug === slug) || null;
  } catch (error) {
    console.warn('Error fetching blog post by slug:', error);
    // Fallback to static post if backend is offline
    return BLOG_POSTS.find(p => p.slug === slug) || null;
  }
}

