import { User } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const authService = {
  async register(data: any): Promise<{ user: User }> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Registration failed');
    const json = await res.json();
    return json.data;
  },

  async login(data: any): Promise<{ user: User }> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Login failed');
    const json = await res.json();
    return json.data;
  },

  async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
  },

  async getMe(): Promise<{ user: User }> {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
    });
    if (!res.ok) throw new Error('Not authenticated');
    const json = await res.json();
    return json.data;
  },
  
  async refresh(): Promise<void> {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Refresh failed');
  }
};
