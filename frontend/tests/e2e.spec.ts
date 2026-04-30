import { test, expect } from '@playwright/test';

  //Register → Login → Add to cart → Checkout → Place order successfully

test('user can complete order flow', async ({ page }) => {
  // 1. Go to homepage
  await page.goto('http://localhost:5173');

  // 2. Go to register page
  await page.getByTestId('nav-register').click();

  const email = `test_${Date.now()}@test.com`;

  // 3. Fill register form
  await page.getByTestId('register-name').fill('Test User');
  await page.getByTestId('register-email').fill(email);
  await page.getByTestId('register-password').fill('123456');

  await page.getByTestId('register-submit').click();

  // 4. Verify user logged in
  await expect(page.getByTestId('nav-user-name')).toBeVisible();

  // 5. Add product to cart
  await page.getByTestId('product-add-p-001').click();

  // 6. Go to cart
  await page.getByTestId('nav-cart').click();

  await expect(page.getByTestId('cart-table')).toBeVisible();

  // 7. Go to checkout
  await page.getByTestId('cart-checkout').click();

  // 8. Fill checkout form
  await page.getByTestId('checkout-name').fill('Test User');
  await page.getByTestId('checkout-email').fill(email);
  await page.getByTestId('checkout-address').fill('27 Rober st');
  await page.getByTestId('checkout-city').fill('Auckland');
  await page.getByTestId('checkout-postcode').fill('1010');

  // 9. Place order
  await page.getByTestId('checkout-submit').click();

  // 10. Verify order confirmation
  await expect(page.getByText('Order confirmed')).toBeVisible();
});