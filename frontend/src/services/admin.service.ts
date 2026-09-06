import api from '@/services/api.client';

export const adminService = {
  async fetch(endpoint: string) {
    const res = await api.get(endpoint);
    return res.data?.data !== undefined ? res.data.data : res.data;
  },
  
  async create(endpoint: string, payload: any) {
    const res = await api.post(endpoint, payload);
    return res.data?.data !== undefined ? res.data.data : res.data;
  },

  async update(endpoint: string, id: string, payload: any) {
    const res = await api.put(`${endpoint}/${id}`, payload);
    return res.data?.data !== undefined ? res.data.data : res.data;
  },

  async delete(endpoint: string, id: string) {
    await api.delete(`${endpoint}/${id}`);
    return true;
  }
};
