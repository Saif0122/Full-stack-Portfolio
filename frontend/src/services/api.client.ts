import axios from 'axios';

const API_URL = typeof window !== 'undefined' ? '/api/v1' : (process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api');

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

let currentCsrfToken = '';

// Request interceptor for CSRF token
api.interceptors.request.use(async (config) => {
  if (typeof document !== 'undefined') {
    const requiresCsrf = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '');
    const match = document.cookie.match(new RegExp('(^| )csrf-token=([^;]+)'));
    let token = match ? match[2] : currentCsrfToken;

    if (requiresCsrf && !token && config.url !== '/auth/csrf') {
      try {
        const res = await axios.get(`${config.baseURL}/auth/csrf`, { withCredentials: true });
        token = res.data.csrfToken;
        currentCsrfToken = token;
      } catch(e) {}
    }

    if (token) {
      config.headers['X-CSRF-Token'] = token;
    }
  }
  return config;
});

// Response interceptor to handle token refresh and CSRF token extraction
api.interceptors.response.use(
  (response) => {
    if (response.headers['x-csrf-token']) {
      currentCsrfToken = response.headers['x-csrf-token'];
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/refresh') {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (typeof document !== 'undefined' && refreshRes.data?.accessToken) {
          document.cookie = `jwt=${refreshRes.data.accessToken}; path=/; max-age=900; SameSite=Lax`;
        }

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed (e.g., expired) - user needs to login again
        if (typeof window !== 'undefined' && !originalRequest.url?.includes('/auth/me')) {
          // You could trigger a custom event here that AuthProvider listens to
          window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
