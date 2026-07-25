const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error('API Request Failed');
  const json = await res.json();
  return json.data;
};

export const cmsService = {
  portfolio: {
    getAll: () => fetcher('/portfolio'),
    get: (section: string) => fetcher(`/portfolio/${section}`),
    create: (data: any) => fetcher('/portfolio', { method: 'POST', body: JSON.stringify(data) }),
    update: (section: string, data: any) => fetcher(`/portfolio/${section}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (section: string) => fetcher(`/portfolio/${section}`, { method: 'DELETE' }),
  },
  posts: {
    getAll: () => fetcher('/posts'),
    get: (id: string) => fetcher(`/posts/${id}`),
    create: (data: any) => fetcher('/posts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetcher(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => fetcher(`/posts/${id}`, { method: 'DELETE' }),
  },
  projects: {
    getAll: () => fetcher('/projects'),
    get: (id: string) => fetcher(`/projects/${id}`),
    create: (data: any) => fetcher('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetcher(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => fetcher(`/projects/${id}`, { method: 'DELETE' }),
  },
  media: {
    getAll: () => fetcher('/media'),
    get: (id: string) => fetcher(`/media/${id}`),
    create: (data: any) => fetcher('/media', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetcher(`/media/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => fetcher(`/media/${id}`, { method: 'DELETE' }),
  },
  settings: {
    getAll: () => fetcher('/settings'),
    get: (key: string) => fetcher(`/settings/${key}`),
    create: (data: any) => fetcher('/settings', { method: 'POST', body: JSON.stringify(data) }),
    update: (key: string, data: any) => fetcher(`/settings/${key}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (key: string) => fetcher(`/settings/${key}`, { method: 'DELETE' }),
  },
  tags: {
    getAll: () => fetcher('/tags'),
    get: (id: string) => fetcher(`/tags/${id}`),
    create: (data: any) => fetcher('/tags', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetcher(`/tags/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => fetcher(`/tags/${id}`, { method: 'DELETE' }),
  }
};
