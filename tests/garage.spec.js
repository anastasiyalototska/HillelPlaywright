import { test, expect } from './fixtures/userGaragePage';

test('Garage page should be visible to authenticated user', async ({ userGaragePage }) => {
  await expect(userGaragePage.getByText('Log out')).toBeVisible();
});
