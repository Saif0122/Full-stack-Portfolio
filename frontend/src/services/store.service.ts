import { Product } from '@/types/store';
import { MOCK_PRODUCTS } from '@/constants/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn('API returned non-ok status for products, falling back to static products.');
      return MOCK_PRODUCTS;
    }
    const json = await res.json();
    
    if (json.data && json.data.length > 0) {
      return json.data;
    }
    return MOCK_PRODUCTS;
  } catch (error) {
    console.warn('Error fetching store products, falling back to static products:', error);
    return MOCK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) {
        return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
      }
      console.warn('API returned non-ok status for product details, falling back to static product.');
      return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
    }
    const json = await res.json();
    
    if (json.data) {
      return json.data;
    }
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  } catch (error) {
    console.warn('Error fetching product by slug, falling back to static product:', error);
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  }
}
