
import { test, expect } from '@playwright/test';

test.use({ storageState: 'C:/ana/aqa-playwright/HillelPlaywright/tests/playwright/.auth/user.json' });


test('should override profile response with mocked data', async ({ page }) => {
    await page.route('**/api/users/profile', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: "ok",
          data: {
            userId: 123456,
            photoFilename: "default-user.png",
            name: "John",
            lastName: "Doe"
          }
        }),
      });
    });
  
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    await page.getByRole('link', { name: 'Profile' }).click();
  
    await expect(page.getByText('John Doe')).toBeVisible();
  });
  