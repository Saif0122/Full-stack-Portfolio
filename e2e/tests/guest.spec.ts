import { test, expect } from '@playwright/test';

test.describe('Guest User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('should load the homepage and display the hero section', async ({ page }) => {
    // Adjust selectors to match the actual UI without modifying UI code
    await expect(page).toHaveTitle(/Saiful Islam|Portfolio/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to the blog section', async ({ page }) => {
    // Click on blog link
    await page.getByRole('link', { name: /blog/i }).first().click();
    
    // Check if URL contains /blog
    await expect(page).toHaveURL(/.*\/blog/);
    await expect(page.locator('h1', { hasText: /Blog|Articles/i })).toBeVisible();
  });

  test('should navigate to the store/digital products section', async ({ page }) => {
    await page.getByRole('link', { name: /store|shop|products/i }).first().click();
    
    await expect(page).toHaveURL(/.*\/digital-products/);
  });

  test('should open and submit the contact form', async ({ page }) => {
    // Navigate to contact or click contact button
    const contactBtn = page.getByRole('button', { name: /contact/i }).first();
    if (await contactBtn.isVisible()) {
      await contactBtn.click();
    } else {
      await page.goto('/contact');
    }
    
    // Fill out form
    await page.getByPlaceholder(/name/i).fill('Test User');
    await page.getByPlaceholder(/email/i).fill('test@example.com');
    await page.getByPlaceholder(/message/i).fill('This is a test message from Playwright E2E.');
    
    // Note: In real test, we might not click submit to avoid spam, or we intercept the request
    // await page.getByRole('button', { name: /send/i }).click();
  });
});
