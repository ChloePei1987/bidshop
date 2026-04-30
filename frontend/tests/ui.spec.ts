import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Verify that the page has loaded
  await expect(page.locator('body')).toBeVisible();
});

test('user can see products list', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Verify that the products section is visible
  await expect(page.locator('text=Products')).toBeVisible();
});

test('user can interact with product', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Locate the first product button on the page
  const button = page.locator('text=Log in to buy').first();

  // Click the button
  await button.click();

  // Verify that the page is go to login page 
  await expect(page.locator('text=Log in to Bidshop')).toBeVisible();
});