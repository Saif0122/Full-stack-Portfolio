# Performance Testing Guide

This guide explains how to test the performance of the SaaS platform locally and in CI/CD pipelines.

## 1. Local Lighthouse Testing
Lighthouse should be run against a **Production Build**, not the development server.

1. Build the app: `npm run build`
2. Start production server: `npm run start`
3. Open Chrome Incognito.
4. Open DevTools -> Lighthouse.
5. Select "Navigation", "Mobile" (or Desktop), and ensure "Clear Storage" is checked.
6. Target: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.

## 2. Load Testing with k6
We use [k6](https://k6.io) to simulate concurrent users and test API/Database throughput.

### Running a Test
Navigate to `performance/scripts/` and run:

```bash
# Test general API throughput
k6 run api-load.js

# Test checkout flow latency
k6 run checkout-flow.js
```

### Metrics to Watch
*   **http_req_duration:** The 95th percentile (p95) must remain under `500ms`.
*   **http_req_failed:** The failure rate must be under `1%`.

## 3. Bundle Analysis
To visualize the size of the JavaScript payload shipped to the client:

1. Enable the analyzer in `next.config.js` via the environment variable.
2. Run `ANALYZE=true npm run build`.
3. Open `.next/analyze/client.html` in your browser.
4. Target: No single chunk should exceed 200KB (parsed).

## 4. Monitoring in Production (Vercel Speed Insights)
*   **LCP (Largest Contentful Paint):** Keep under 2.5s.
*   **INP (Interaction to Next Paint):** Keep under 200ms.
*   **CLS (Cumulative Layout Shift):** Keep under 0.1.
