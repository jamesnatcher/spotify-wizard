import { expect, test } from '@playwright/test';

test('index page shows get started action', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: /click here to get started!/i })).toBeVisible();
});
