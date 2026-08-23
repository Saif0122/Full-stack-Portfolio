const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';

export const aiService = {
  async getSettings() {
    const res = await fetch(`${API_URL}/ai/settings`, { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch AI settings');
    return res.json();
  },

  async updateSettings(data: any) {
    const res = await fetch(`${API_URL}/ai/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update AI settings');
    return res.json();
  },

  async getPrompts(query = '') {
    const res = await fetch(`${API_URL}/ai/prompts${query}`, { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch prompts');
    return res.json();
  },

  async generate(module: string, prompt: string, options = {}) {
    const res = await fetch(`${API_URL}/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, prompt, options }),
    });
    if (!res.ok) throw new Error('Generation failed');
    return res.json();
  }
};
