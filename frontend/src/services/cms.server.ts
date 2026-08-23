const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';

export async function getPortfolioData() {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      next: { revalidate: 60, tags: ['portfolio'] }, // Revalidate every minute, or on-demand
      signal: AbortSignal.timeout(5000) // Fail fast during Vercel build
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

import { PROJECTS } from '../constants/projects';

export async function getProjectsData() {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      next: { revalidate: 60, tags: ['projects'] },
      signal: AbortSignal.timeout(5000) // Fail fast during Vercel build
    });
    if (!res.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const result = await res.json();
    return result.data && result.data.length > 0 ? result.data : PROJECTS;
  } catch (error) {
    console.error('Error fetching projects data, falling back to demo data:', error);
    return PROJECTS;
  }
}
