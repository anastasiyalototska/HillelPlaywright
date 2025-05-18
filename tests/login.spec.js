import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config(); 

const url = process.env.URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;


test('should login successfully', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('#signinEmail').fill(email);
    await page.locator('#signinPassword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('text=Log out')).toBeVisible();
  });
