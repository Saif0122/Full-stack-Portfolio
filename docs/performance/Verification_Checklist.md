# Performance Verification Checklist

Use this checklist during staging to verify that all performance optimizations are active and functioning correctly.

## 1. Network & Bundle Verification
- [ ] Open Network Tab. Ensure the total initial JS payload transferred is `< 250KB` (gzipped).
- [ ] Navigate to the Admin AI Dashboard. Verify that the `recharts` chunk is only downloaded *when* the Analytics tab is clicked (Lazy loading working).
- [ ] Inspect Images. Ensure they are served in `webp` or `avif` formats via the Next.js `_next/image` route.

## 2. API & Caching Verification
- [ ] Make a GET request to `/api/analytics/ai`. Verify TTFB is `< 200ms`.
- [ ] Make the same request again. Verify the `x-vercel-cache` header says `HIT` or the response time drops to `< 50ms` (Redis/Cache hit).
- [ ] Trigger an AI Generation. Ensure the response streams incrementally rather than waiting for the full payload.

## 3. Database Verification (MongoDB)
- [ ] Access MongoDB Atlas/Compass.
- [ ] Run `.explain("executionStats")` on the blog post query: `db.posts.find({status: 'published'}).sort({publishedAt: -1}).explain(...)`.
- [ ] Verify `totalDocsExamined` is equal to `nReturned` (Index is working, no COLLSCAN).

## 4. Accessibility Verification
- [ ] Run `axe-core` via Chrome DevTools. Verify 0 Critical and 0 Serious violations on the Homepage, Blog, and Dashboard.
- [ ] Enable VoiceOver (Mac) or NVDA (Windows) and successfully navigate through the checkout flow without touching the mouse.
