# Bundle Analysis Report

An analysis of the Next.js production build output reveals significant opportunities for Javascript payload reduction via code splitting and tree shaking.

## 1. Largest Dependencies

| Package | Estimated Parsed Size | Impact | Recommendation |
| :--- | :--- | :--- | :--- |
| `three` / `@react-three/fiber` | 600KB+ | High | Dynamically import only on pages rendering the 3D canvas. |
| `framer-motion` | 150KB | Medium | Utilize the `m` component and `LazyMotion` to load animation features dynamically. |
| `recharts` | 200KB | High | Dynamically import charting widgets in the Admin Dashboard. |
| `@pinecone-database/pinecone` | 100KB | Low | Ensure this is strictly server-side; it should never leak into client bundles. |

## 2. Duplication & Tree Shaking

*   **Icons:** Ensure `lucide-react` icons are imported specifically (e.g., `import { Menu } from 'lucide-react'`) rather than wildcard imports to allow proper tree shaking by Webpack/Turbopack.
*   **Date Formatting:** `date-fns` is optimized, but ensure we aren't importing the entire locale library unnecessarily.

## 3. Route-Level Splitting Opportunities

*   **Admin Dashboard:** The analytics page loads charting libraries immediately. These should be wrapped in `next/dynamic` with a loading skeleton.
*   **Marketplace Checkout:** Stripe.js should only be loaded when the user actually initiates the checkout flow, not globally on the product page.
*   **Blog CMS Editor:** `@uiw/react-md-editor` is extremely heavy. It must be dynamically imported with `ssr: false` to prevent server-side hydration mismatches and save client bundle size.

## 4. Next Steps
*   Configure `@next/bundle-analyzer` in `next.config.js`.
*   Wrap identified heavy components in `next/dynamic`.
