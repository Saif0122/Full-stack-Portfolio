# Developer Testing Guide

Welcome to the comprehensive testing guide for the SaaS Platform. This guide outlines how to run, write, and maintain tests across the stack.

## Getting Started

Before running tests, ensure you have installed dependencies in both the `frontend/` and `backend/` directories.

### Running Tests Locally

**Frontend:**
```bash
cd frontend
npm run test           # Run Vitest in watch mode
npm run test:coverage  # Run Vitest with coverage report
```

**Backend:**
```bash
cd backend
npm run test           # Run Jest in watch mode
npm run test:coverage  # Run Jest with coverage report
```

**End-to-End (Playwright):**
```bash
# From the root directory
npx playwright test
npx playwright show-report
```

**Performance (k6):**
Ensure k6 is installed globally (`brew install k6` or `choco install k6`), then:
```bash
cd performance/scripts
k6 run api-load.js
```

## Writing Tests

### 1. Frontend Components (React Testing Library)
- **Location:** Co-locate tests with components (e.g., `Button.tsx` -> `Button.test.tsx`).
- **Best Practices:** 
  - Query by Role (`getByRole`) or Text (`getByText`) instead of test IDs whenever possible.
  - Mock external dependencies (like framer-motion or router) using `vitest.mock`.

### 2. Backend API (Supertest)
- **Location:** `backend/tests/api/`
- **Best Practices:**
  - Setup a clean MongoDB Memory Server state before each suite.
  - Verify status codes, body structure, and database changes.
  - Mock third-party APIs (Stripe, Resend, Google GenAI).

### 3. End-to-End (Playwright)
- **Location:** `e2e/tests/`
- **Best Practices:**
  - Use `data-testid` only when semantic HTML selectors are insufficient.
  - Do not mock the database for E2E tests, but use test Stripe keys and test user accounts.

## Coverage Expectations
Our strict threshold is **95%** across Statements, Branches, Functions, and Lines. The CI pipeline will automatically fail if coverage drops below this mark. If you are adding a new feature, you must write accompanying tests.
