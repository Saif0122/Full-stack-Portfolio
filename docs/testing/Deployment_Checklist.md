# Deployment Verification Checklist

This checklist must be reviewed prior to merging to `main` and deploying to production.

## 1. CI/CD Pipeline Checks
- [ ] GitHub Actions pipeline completed successfully.
- [ ] No Linting or Type-Check errors.
- [ ] Code coverage is above 95% threshold in frontend and backend.
- [ ] Playwright E2E smoke tests passed.

## 2. Infrastructure & Environment
- [ ] Environment variables updated in Production (Vercel/Render/etc.).
- [ ] Database migrations applied successfully.
- [ ] Redis Cache flushed if caching schema changed.
- [ ] Pinecone / Vector DB indices updated if embeddings logic changed.

## 3. Third-Party Integrations
- [ ] Stripe Webhook endpoint correctly configured with production keys and secrets.
- [ ] Google AI / OpenAI API keys have billing alerts and hard limits set.
- [ ] Sentry DSN active and receiving exceptions.

## 4. Post-Deployment Smoke Test (Manual in Prod)
- [ ] Verify SSL Certificate.
- [ ] Load the homepage, check for hydration errors in console.
- [ ] Attempt a mock login/registration.
- [ ] Query the AI assistant and verify response times.
- [ ] Submit a contact form.

## Rollback Plan
- [ ] Determine criteria for rollback (e.g., 5xx error rate > 5% within 10 mins).
- [ ] Verify database backup was taken prior to deployment.
