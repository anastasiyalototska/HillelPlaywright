import { test as setup } from '@playwright/test';

const authFile = 'tests/playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Email').fill('testqa123@gmail.com');
  await page.getByLabel('Password').fill('Testqa123@');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

  await page.context().storageState({ path: authFile });
});
