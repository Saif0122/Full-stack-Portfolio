import { test, expect } from '@playwright/test';

test.describe('Guest User Journey', () => {
  test('should navigate to home page and see the portfolio', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main title is present (assuming "Saiful Islam" or "Nexus" is on the page)
    await expect(page).toHaveTitle(/Saiful/i);
    
    // Verify navigation links exist
    const navLinks = ['Projects', 'Blog', 'Store', 'Contact'];
    for (const link of navLinks) {
      const locator = page.getByRole('link', { name: new RegExp(link, 'i') });
      await expect(locator.first()).toBeVisible();
    }
  });

  test('should view the blog', async ({ page }) => {
    await page.goto('/blog');
    
    // Look for blog posts container or a heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should navigate to contact form and display validation errors on empty submit', async ({ page }) => {
    await page.goto('/contact');
    
    // Click submit without filling form
    const submitBtn = page.getByRole('button', { name: /send/i });
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      
      // Expect validation errors (e.g. "Required" or "invalid")
      const errors = page.locator('.text-red-500'); // Assuming tailwind red for errors
      await expect(errors.first()).toBeVisible();
    }
  });
});
