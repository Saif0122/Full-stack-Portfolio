import { Product } from '@/types/store';
import { MOCK_PRODUCTS } from '@/constants/store';
import { fetchWithTimeout } from '@/utils/fetch';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn('API returned non-ok status for products, falling back to static products.');
      return MOCK_PRODUCTS.map(p => ({ ...p, _isMock: true }));
    }
    const json = await res.json();
    
    if (json.data && json.data.length > 0) {
      return json.data;
    }
    return MOCK_PRODUCTS.map(p => ({ ...p, _isMock: true }));
  } catch (error) {
    console.warn('Error fetching store products, falling back to static products:', error);
    return MOCK_PRODUCTS.map(p => ({ ...p, _isMock: true }));
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) {
        const mock = MOCK_PRODUCTS.find(p => p.slug === slug);
        return mock ? { ...mock, _isMock: true } : null;
      }
      console.warn('API returned non-ok status for product details, falling back to static product.');
      const mock = MOCK_PRODUCTS.find(p => p.slug === slug);
      return mock ? { ...mock, _isMock: true } : null;
    }
    const json = await res.json();
    
    if (json.data) {
      return json.data;
    }
    const fallback = MOCK_PRODUCTS.find(p => p.slug === slug);
    return fallback ? { ...fallback, _isMock: true } : null;
  } catch (error) {
    console.warn('Error fetching product by slug, falling back to static product:', error);
    const fallback = MOCK_PRODUCTS.find(p => p.slug === slug);
    return fallback ? { ...fallback, _isMock: true } : null;
  }
}
