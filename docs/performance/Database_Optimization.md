# Database Optimization Report

This report outlines the strategy for optimizing MongoDB performance to reduce API latency and ensure scalability under high load.

## 1. Indexing Strategy

Current collections lack compound indexes, leading to full collection scans (COLLSCAN) on complex queries.

**Required Indexes:**
*   `Users`: `{ email: 1 }` (Unique), `{ role: 1 }`
*   `Posts` (Blog): `{ slug: 1 }` (Unique), `{ status: 1, publishedAt: -1 }` (Compound for chronologically fetching published posts).
*   `Products` (Marketplace): `{ category: 1, price: 1 }`, `{ status: 1, createdAt: -1 }`.
*   `Orders`: `{ user: 1, status: 1 }`.
*   `Analytics`: `{ eventType: 1, timestamp: -1 }` (Time-series optimization).

## 2. Query Optimization (The `.lean()` pattern)

Currently, the Mongoose ODM returns fully hydrated document instances. For read-only operations (GET endpoints), this adds massive memory overhead and serialization time.

**Action:**
Append `.lean()` to all read-only queries.
*Example:* `await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();`

## 3. Aggregation Pipeline Tuning

The Analytics Dashboard uses complex aggregations. 
*   **Action:** Ensure that `$match` is the *very first* stage in all pipelines to filter documents before processing.
*   **Action:** Use `$project` early to discard heavy fields (like `content` in blog posts) before grouping.

## 4. Connection Pooling

*   **Action:** Increase Mongoose `maxPoolSize` from the default (10) to 50 for the production environment to prevent connection bottlenecking during traffic spikes.
