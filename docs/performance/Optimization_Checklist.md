# Performance Optimization Checklist

Follow this checklist when building or modifying features to ensure the platform remains blazing fast and maintains a 95+ Lighthouse Performance score.

## Frontend (React/Next.js)
- [ ] **Images:** All images use `next/image` with explicit `width`, `height`, and `priority` on above-the-fold assets.
- [ ] **Dynamic Imports:** Heavy third-party libraries (e.g., Recharts, Three.js, MDX Editors) are loaded using `next/dynamic` with `ssr: false` when they don't need server rendering.
- [ ] **Memoization:** Expensive renders are wrapped in `React.memo()`. Complex filtering or mapping logic uses `useMemo()`.
- [ ] **Icons:** Avoid wildcard imports from icon libraries. Import specific icons (e.g., `import { Home } from 'lucide-react'`).
- [ ] **Font Loading:** Use `next/font` with `display: swap`.

## Backend (MongoDB/Node.js)
- [ ] **Lean Queries:** All `.find()`, `.findOne()`, and `.findById()` queries in GET endpoints end with `.lean()` to return plain JavaScript objects.
- [ ] **Aggregations:** Pipeline operations start with `$match` to reduce the dataset before complex grouping or joining.
- [ ] **Indexing:** New query patterns are backed by appropriate single-field or compound indexes.

## API & Caching
- [ ] **Redis:** Expensive analytical queries or static system configs are cached in Redis.
- [ ] **CDN Headers:** Responses meant to be public include `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.
- [ ] **Rate Limiting:** IP-based rate limiting is applied to all POST/PUT/DELETE mutations and AI query endpoints.

## AI Execution (Gemini)
- [ ] **Streaming:** All AI generations stream tokens to the client using `ai/react` and `ai` packages.
- [ ] **Semantic Caching:** Identical prompts are caught by the Pinecone vector search and return cached responses instantly.
- [ ] **Context Bounds:** Chat history sent to the LLM is capped at the last 6 messages to preserve tokens.
