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

export const checkoutService = {
  createSession: (orderData: any, providerName: string = 'stripe') => 
    fetcher('/checkout', { method: 'POST', body: JSON.stringify({ orderData, providerName }) }),
};

export const commerceService = {
  orders: {
    getAll: () => fetcher('/orders/history'),
    get: (id: string) => fetcher(`/orders/${id}`),
  },
  payments: {
    getHistory: () => fetcher('/payments/history'),
  },
  downloads: {
    getAll: (productId: string) => fetcher(`/downloads/product/${productId}`),
    downloadFile: (id: string) => fetcher(`/downloads/${id}`),
  },
  invoices: {
    getAll: () => fetcher('/invoices'),
    get: (invoiceNumber: string) => fetcher(`/invoices/${invoiceNumber}`),
  },
  licenses: {
    getAll: () => fetcher('/licenses'),
    validate: (key: string) => fetcher('/licenses/validate', { method: 'POST', body: JSON.stringify({ key }) }),
  }
};
