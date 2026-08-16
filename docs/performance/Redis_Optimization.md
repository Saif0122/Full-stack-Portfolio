# Redis Cache Optimization Strategy

This report defines the caching architecture using Redis to drastically reduce MongoDB load and improve API Response Times (TTFB).

## 1. Cache Layers

### A. Global Configuration Cache
*   **Target:** System settings, navigation menus, AI model configurations.
*   **Strategy:** Cache indefinitely. Invalidate only on Admin mutation (e.g., `PUT /api/settings`).
*   **Key Pattern:** `cache:global:settings`

### B. Content Cache (Blog & Portfolio)
*   **Target:** Public blog articles, project listings.
*   **Strategy:** Cache with a TTL (Time To Live) of 1 hour, or invalidate on publish/update.
*   **Key Pattern:** `cache:blog:list:page:1`, `cache:blog:post:{slug}`

### C. Rate Limiting & Security
*   **Target:** API endpoints, Login routes, AI execution routes.
*   **Strategy:** Implement `redis-rate-limiter` to track IP or User ID hits per minute to prevent DDoS and API abuse, strictly separated from the memory-heavy content cache.

## 2. Implementation Rules

1.  **Cache-Aside Pattern:** The application should first check Redis. If a cache miss occurs, query MongoDB, store the result in Redis, and return it.
2.  **Compression:** Store large JSON blobs (like full blog articles) as compressed strings in Redis using `zlib` to save memory.
3.  **Serialization:** Ensure all Mongoose documents are converted to plain objects (`.lean()`) before caching to avoid circular JSON errors.
4.  **Stale-While-Revalidate:** For high-traffic pages, serve the stale Redis cache immediately while fetching fresh data from MongoDB in the background to update the cache for the next user.
