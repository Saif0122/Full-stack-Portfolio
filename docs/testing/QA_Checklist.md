# QA Checklist & Verification Guide

This checklist ensures that the platform is ready for production deployment by verifying all critical functionality manually and through automated means.

## Automated Verification (Run in CI)
- [ ] **Unit Tests (Frontend)**: `npm run test:coverage` in `/frontend`. Must be >= 95%.
- [ ] **Unit Tests (Backend)**: `npm run test:coverage` in `/backend`. Must be >= 95%.
- [ ] **API Integration Tests**: `npm run test:api` in `/backend`.
- [ ] **E2E Playwright Tests**: `npm run test:e2e` in root.
- [ ] **Linting & Types**: `npm run lint` and `npm run type-check`.

## Manual Verification

### 1. Authentication & Authorization
- [ ] Register a new account.
- [ ] Login with the new account.
- [ ] Verify JWT token in cookies/localStorage.
- [ ] Test route protection (try accessing admin routes as a guest).
- [ ] Password reset flow (if applicable).

### 2. Core Workflows
- [ ] **Blog**: Read a post, submit a comment.
- [ ] **Store**: Add item to cart, proceed to checkout.
- [ ] **Payment**: Complete a Stripe test purchase and verify webhook updates order status.
- [ ] **Downloads**: Verify secure file download post-purchase.

### 3. AI Features
- [ ] Chat with AI assistant and verify context retention across 3 turns.
- [ ] Verify AI prompt routing triggers appropriate models.

### 4. Accessibility
- [ ] Navigate the entire homepage using only the `Tab` key.
- [ ] Verify focus rings are clearly visible.
- [ ] Run Lighthouse or axe DevTools extension to ensure 0 critical violations.

### 5. Security Check
- [ ] Verify CSRF headers on mutations.
- [ ] Check for XSS by submitting `<script>alert(1)</script>` in comment forms.
- [ ] Confirm sensitive environment variables are not exposed to the client.
