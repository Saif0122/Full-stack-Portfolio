// Use Next.js rewrite proxy on the client to avoid CORS, and absolute URL on the server
const API_URL = typeof window !== 'undefined' ? '/api/v1' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

export const adminService = {
  async fetch(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error('Failed to fetch ' + endpoint);
    const json = await res.json();
    return json.data;
  },
  
  async create(endpoint: string, payload: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create');
    const json = await res.json();
    return json.data;
  },

  async update(endpoint: string, id: string, payload: any) {
    const res = await fetch(`${API_URL}${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update');
    const json = await res.json();
    return json.data;
  },

  async delete(endpoint: string, id: string) {
    const res = await fetch(`${API_URL}${endpoint}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    return true;
  }
};
