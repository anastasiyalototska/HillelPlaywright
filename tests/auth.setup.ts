import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json';
const url = process.env.URL!;
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;

setup('Login and save storage state', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signinEmail').fill(email);
  await page.locator('#signinPassword').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Log out')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
