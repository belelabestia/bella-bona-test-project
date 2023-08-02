import { expect, test } from "@playwright/test";

test("should show products", async ({ page }) => {
  await page.goto('http://localhost:3001/customer/1/products');

  const card1 = page.getByText('Name: Product 1 order 1SKU: 1Quantity: 11Status: processingEdit ordered products');
  const card2 = page.getByText('Name: Product 2 order 2SKU: 2Quantity: 7Status: processingEdit ordered products');
  const card3 = page.getByText('Name: Product 3 order 3SKU: 3Quantity: 6Status: doneEdit ordered products');

  await expect(card1).toBeVisible();
  await expect(card2).toBeVisible();
  await expect(card3).toBeVisible();
});

test("should expand ordered products", async ({ page }) => {
  await page.goto('http://localhost:3001/customer/1/products');

  await page
    .locator('li')
    .filter({ hasText: 'Name: Product 1 order 1SKU: 1Quantity: 11Status: processingEdit ordered products' })
    .getByRole('button')
    .click();

  const heading = page.getByRole('heading', { name: 'Products' });
  const product1 = page.getByText('Name: Product 1 order 1Order date: 1/1/2020Quantity:Status:processingdone').first();
  const product2 = page.getByText('Name: Product 1 order 1Order date: 1/1/2020Quantity:Status:processingdone').nth(1);
  const product3 = page.getByText('Name: Product 1 order 3Order date: 1/3/2020Quantity:Status:processingdone').first();

  await expect(heading).toBeVisible();
  await expect(product1).toBeVisible();
  await expect(product2).toBeVisible();
  await expect(product3).toBeVisible();
});

test("should hide save button before edit", async ({ page }) => {
  await page.goto('http://localhost:3001/customer/1/products');

  await page.locator('li').filter({ hasText: 'Name: Product 1 order 1SKU: 1Quantity: 11Status: processingEdit ordered products' }).getByRole('button').click();

  const save = page.getByRole('button', { name: 'Save' });
  await expect(save).not.toBeVisible();
});

test("should show save button on edit", async ({ page }) => {
  await page.goto('http://localhost:3001/customer/1/products');

  await page.locator('li').filter({ hasText: 'Name: Product 1 order 1SKU: 1Quantity: 11Status: processingEdit ordered products' }).getByRole('button').click();
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('23');

  const save = page.getByRole('button', { name: 'Save' });
  await expect(save).toBeVisible();
});

test("should edit product", async ({ page }) => {
  await page.goto('http://localhost:3001/customer/1/products');

  await page.locator('li').filter({ hasText: 'Name: Product 1 order 1SKU: 1Quantity: 11Status: processingEdit ordered products' }).getByRole('button').click();
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('23');
  await page.locator('form').filter({ hasText: 'Name: Product 1 order 1Order date: 1/1/2020Quantity:Status:processingdoneSave' }).getByRole('combobox').selectOption('done');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('li').filter({ hasText: 'Name: Product 1 order 1SKU: 1Quantity: 32Status: processingEdit ordered products' }).getByRole('button').click();

  const quantity = page.getByRole('spinbutton').first();
  const status = page.getByRole('combobox').first();

  await expect(quantity).toHaveValue("23");
  await expect(status).toHaveValue("done");

  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('2');
  await page.locator('form').filter({ hasText: 'Name: Product 1 order 1Order date: 1/1/2020Quantity:Status:processingdoneSave' }).getByRole('combobox').selectOption('processing');
  await page.getByRole('button', { name: 'Save' }).click();
});
