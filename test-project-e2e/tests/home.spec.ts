import { test, expect } from "@playwright/test";

test("should redirect to homepage", async ({ page }) => {
  await page.goto("http://localhost:3001/");
  await expect(page).toHaveURL("http://localhost:3001/home");
});

test("should show 'Welcome!'", async ({ page }) => {
  await page.goto("http://localhost:3001/home");

  const title = page.getByRole("heading", { name: "Welcome!" })
  await expect(title).toBeVisible();
});

test("should show customers", async ({ page }) => {
  await page.goto("http://localhost:3001/home");

  const customer1 = page.getByRole('button', { name: 'Customer 1' });
  const customer2 = page.getByRole('button', { name: 'Customer 2' });

  await expect(customer1).toBeVisible();
  await expect(customer2).toBeVisible();
});

test("should select customer", async ({ page }) => {
  await page.goto("http://localhost:3001/home");

  await page.getByRole("button", { name: "Customer 1" }).click();

  const customer = page.getByRole("link", { name: "👤 Customer 1" });
  await expect(customer).toBeVisible();
});

test("should show products and orders", async ({ page }) => {
  await page.goto("http://localhost:3001/home");

  await page.getByRole("button", { name: "Customer 1" }).click();

  const products = page.getByRole('link', { name: '📦 Products' })
  const orders = page.getByRole('link', { name: '🛒 Orders' });

  await expect(products).toBeVisible();
  await expect(orders).toBeVisible();
});

test("should navigate to products", async ({ page }) => {
  await page.goto("http://localhost:3001/home");

  await page.getByRole('button', { name: 'Customer 1' }).click();
  await page.getByRole('link', { name: '📦 Products' }).click();

  await expect(page).toHaveURL("http://localhost:3001/customer/1/products");
});

test("should automatically select customer", async ({ page }) => {
  await page.goto('http://localhost:3001/customer/1/products');

  const customer1 = page.getByRole('link', { name: '👤 Customer 1' });
  await expect(customer1).toBeVisible();
});
