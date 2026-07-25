import { Product } from '@/types/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch store products');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching store products:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product details');
    }
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}
