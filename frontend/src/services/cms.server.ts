import { fetchWithTimeout } from '@/utils/fetch';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getPortfolioData() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/portfolio`, {
      next: { revalidate: 60, tags: ['portfolio'] } // Revalidate every minute, or on-demand
    });
    if (!res.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    const result = await res.json();
    
    // Convert array of sections into a key-value map for easier frontend consumption
    const dataMap: Record<string, any> = {};
    if (result.data && Array.isArray(result.data)) {
      result.data.forEach((item: any) => {
        dataMap[item.section] = item.content;
      });
    }
    return dataMap;
  } catch (error) {
    console.error('Error fetching CMS data:', error);
    return {}; // Return empty object as fallback
  }
}
