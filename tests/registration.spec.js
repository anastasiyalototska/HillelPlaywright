import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration', () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `test+${Date.now()}@example.com`;
  const password = 'Password123';
  const mismatchedPassword = 'Password321';
  const shortPassword = 'P1a';
  const longName = 'a'.repeat(21);
  const shortName = 'A';
  const invalidEmail = 'invalid-email';

  test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();
  });

  test('should register a new user successfully', async ({ page }) => {
    await page.locator('#signupName').fill(firstName);
    await page.locator('#signupLastName').fill(lastName);
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill(password);
    await page.locator('#signupRepeatPassword').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('text=Log out')).toBeVisible();

  });

  test('should display "Name required" when the name field is left empty', async ({ page }) => {
    await page.locator('#signupName').focus();
    await page.locator('#signupName').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Name required' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for empty last name', async ({ page }) => {
    await page.locator('#signupLastName').focus();
    await page.locator('#signupLastName').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Last name required' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for empty email', async ({ page }) => {
    await page.locator('#signupEmail').focus();
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Email required' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.locator('#signupEmail').fill(invalidEmail);
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Email is incorrect' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for empty password', async ({ page }) => {
    await page.locator('#signupPassword').focus();
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Password required' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for password too short', async ({ page }) => {
    await page.locator('#signupPassword').fill(shortPassword);
    await page.locator('#signupPassword').blur();
    await expect(
      page.locator('.invalid-feedback p', {
        hasText:
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for password missing required character types', async ({ page }) => {
    await page.locator('#signupPassword').fill('password');
    await page.locator('#signupPassword').blur();
    await expect(
      page.locator('.invalid-feedback p', {
        hasText:
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for empty re-enter password', async ({ page }) => {
    await page.locator('#signupRepeatPassword').focus();
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Re-enter password required' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error if passwords do not match', async ({ page }) => {
    await page.locator('#signupName').fill(firstName);
    await page.locator('#signupLastName').fill(lastName);
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill(password);
    await page.locator('#signupRepeatPassword').fill(mismatchedPassword);
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback p', { hasText: 'Passwords do not match' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for name too short', async ({ page }) => {
    await page.locator('#signupName').fill(shortName);
    await page.locator('#signupName').blur();
    await expect(
      page.locator('.invalid-feedback p', {
        hasText: 'Name has to be from 2 to 20 characters long',
      })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should show error for name too long', async ({ page }) => {
    await page.locator('#signupName').fill(longName);
    await page.locator('#signupName').blur();
    await expect(
      page.locator('.invalid-feedback p', {
        hasText: 'Name has to be from 2 to 20 characters long',
      })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should trim extra whitespace in first name', async ({ page }) => {
    const nameWithWhitespace = '   John   ';
    await page.locator('#signupName').fill(nameWithWhitespace);
    await page.locator('#signupName').blur();
    await expect(page.locator('#signupName')).toHaveValue(nameWithWhitespace.trim());
  });

  test('should trim extra whitespace in last name', async ({ page }) => {
    const lastNameWithWhitespace = '   Doe   ';
    await page.locator('#signupLastName').fill(lastNameWithWhitespace);
    await page.locator('#signupLastName').blur();
    await expect(page.locator('#signupLastName')).toHaveValue(lastNameWithWhitespace.trim());
  });

  test('should enable Register button when form is valid', async ({ page }) => {
    await page.locator('#signupName').fill(firstName);
    await page.locator('#signupLastName').fill(lastName);
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill(password);
    await page.locator('#signupRepeatPassword').fill(password);
    await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
  });
});
