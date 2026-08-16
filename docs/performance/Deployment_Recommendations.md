# Deployment Recommendations for Ultimate Performance

To ensure the optimizations in this repository translate to real-world performance, the following infrastructure deployment recommendations must be followed.

## 1. Vercel Configuration (Frontend & Edge)
*   **Edge Functions:** For the AI streaming endpoints (`/api/ai/generate`), configure the route to use the Edge Runtime in Vercel to eliminate cold starts and reduce latency.
*   **ISR Tuning:** Set `revalidate: 3600` (1 hour) on static Blog post pages. Set up a Vercel Webhook that invalidates the cache instantly when a new post is published via the CMS.
*   **Region Selection:** Ensure the Vercel function region (e.g., `iad1`) geographically matches the primary MongoDB Atlas region.

## 2. MongoDB Atlas Configuration
*   **Tier:** Ensure the cluster is at least M10 (Dedicated) for production to have dedicated RAM for the working set (indexes).
*   **Network Peering:** Setup AWS VPC Peering (or equivalent) between Vercel and MongoDB Atlas to keep database traffic strictly internal and minimize network round-trip time (RTT).

## 3. Redis / Upstash Cache
*   **Global Distribution:** Use a Global Redis database (like Upstash Global Database) so that edge functions running in different global regions hit a Redis node closest to them.
*   **Eviction Policy:** Set the Redis eviction policy to `allkeys-lru` (Least Recently Used) to ensure the cache never fills up completely and crashes.

## 4. Environment Variables
*   Ensure `ANALYZE=false` in production.
*   Enable Next.js compression by default (usually handled by Vercel automatically).
