import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    checkout: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% under 1s
    http_req_failed: ['rate<0.05'],    // Max 5% failure
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:5000/api';

export default function () {
  // Mock a checkout creation request (requires auth in a real scenario, this is a structure)
  const payload = JSON.stringify({
    productId: 'mock-product-id',
    quantity: 1
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer MOCK_TOKEN' // In a real test, obtain token in setup()
    },
  };

  const res = http.post(`${BASE_URL}/payments/create-checkout-session`, payload, params);
  
  check(res, {
    'status is 200 or 401': (r) => r.status === 200 || r.status === 401, // 401 because token is mock
  });
  
  sleep(2);
}
