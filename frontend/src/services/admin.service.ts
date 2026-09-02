// Use Next.js rewrite proxy on the client to avoid CORS, and absolute URL on the server
const API_URL = typeof window !== 'undefined' ? '/api/v1' : (process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api');

const defaultOptions = {
  credentials: 'include' as RequestCredentials
};

const getCsrfToken = () => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )csrf-token=([^;]+)'));
    return match ? match[2] : '';
  }
  return '';
};

export const adminService = {
  async fetch(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`, { ...defaultOptions });
    if (!res.ok) throw new Error('Failed to fetch ' + endpoint);
    const json = await res.json();
    return json.data;
  },
  
  async create(endpoint: string, payload: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create');
    const json = await res.json();
    return json.data;
  },

  async update(endpoint: string, id: string, payload: any) {
    const res = await fetch(`${API_URL}${endpoint}/${id}`, {
      ...defaultOptions,
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update');
    const json = await res.json();
    return json.data;
  },

  async delete(endpoint: string, id: string) {
    const res = await fetch(`${API_URL}${endpoint}/${id}`, { 
      ...defaultOptions, 
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': getCsrfToken()
      }
    });
    if (!res.ok) throw new Error('Failed to delete');
    return true;
  }
};
