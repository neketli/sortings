import { test, expect } from '@playwright/test';

test.describe('Sortings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page and display the title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Sortings');
  });

  test('should update array length via number input', async ({ page }) => {
    const slider = page.locator('.el-slider input[type="number"]').nth(0);
    await expect(slider).toHaveValue('10'); 

    await slider.fill('20');
    await page.waitForTimeout(1000); 

    const arrayItems = page.locator('.bar-item'); 
    await expect(arrayItems).toHaveCount(20);
  });

  test('should update animation speed via slider', async ({ page }) => {
    const speedSlider = page.locator('.el-slider input[type="number"]').nth(1);
    await expect(speedSlider).toHaveValue('1'); 

    await speedSlider.fill('5');
    await expect(speedSlider).toHaveValue('5');
  });

  test('should select a sorting algorithm', async ({ page }) => {
    const select = page.locator('.el-select');
    await select.click();
    await page.locator('.el-select-dropdown .el-select-dropdown__item').filter({ hasText: 'Quick sort' }).click();

    await expect(select.locator('.el-input__inner')).toHaveValue(/Quick sort/);
  });

  test('should start sorting and disable controls', async ({ page }) => {
    const startButton = page.locator('button:has-text("Start")');
    const select = page.locator('.el-select input[type="text"]').first();
    const slider = page.locator('.el-slider input[type="number"]').first();

    await expect(startButton).not.toBeDisabled();

    await startButton.click();

    await expect(startButton).toBeDisabled();
    await expect(select).toBeDisabled();
    await expect(slider).toBeDisabled();
  });

  test('should open drawer with sorting description', async ({ page }) => {
    const drawerButton = page.locator('button:has-text("How it works?")');
    const drawer = page.locator('.el-drawer');

    await expect(drawer).not.toBeVisible();

    await drawerButton.click();
    await expect(drawer).toBeVisible();

    await expect(drawer.locator('h2')).toHaveText('Bubble sort');
  });
});