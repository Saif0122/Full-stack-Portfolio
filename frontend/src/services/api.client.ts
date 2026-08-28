import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api',
  withCredentials: true, // Important for cookies
});

let csrfToken: string | null = null;

// Helper to fetch the CSRF token
export const fetchCsrfToken = async () => {
  try {
    const res = await axios.get(`${api.defaults.baseURL}/auth/csrf`, {
      withCredentials: true,
    });
    if (res.data?.csrfToken) {
      csrfToken = res.data.csrfToken;
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token', error);
  }
};

// Request interceptor for CSRF token
api.interceptors.request.use(async (config) => {
  // Only attach to mutation methods
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    if (!csrfToken) {
      await fetchCsrfToken();
    }
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/refresh') {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed (e.g., expired) - user needs to login again
        // We do NOT dispatch this for '/auth/me' to prevent redirecting unauthenticated users visiting public pages
        if (typeof window !== 'undefined' && originalRequest.url !== '/auth/me') {
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
