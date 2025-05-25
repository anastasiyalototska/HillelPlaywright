import { test as base, Page } from '@playwright/test';

export const test = base.extend<{
  userGaragePage: Page;
}>({
  userGaragePage: async ({ page }, use) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    await use(page);
  },
});

export { expect } from '@playwright/test';

