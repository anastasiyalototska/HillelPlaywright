import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegistrationPage } from '../pages/RegistrationPage';

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

  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.openRegistrationForm();
  });

  test('should register a new user successfully', async () => {
    await registrationPage.fillRegistrationForm({
      firstName,
      lastName,
      email,
      password,
      repeatPassword: password,
    });
    await registrationPage.registerButton.click();
    await expect(registrationPage.page.locator('text=Log out')).toBeVisible();
  });

  test('should display "Name required" when the name field is left empty', async () => {
    await registrationPage.firstNameInput.focus();
    await registrationPage.firstNameInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Name required' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for empty last name', async () => {
    await registrationPage.lastNameInput.focus();
    await registrationPage.lastNameInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Last name required' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for empty email', async () => {
    await registrationPage.emailInput.focus();
    await registrationPage.emailInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Email required' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for invalid email format', async () => {
    await registrationPage.emailInput.fill(invalidEmail);
    await registrationPage.emailInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Email is incorrect' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for empty password', async () => {
    await registrationPage.passwordInput.focus();
    await registrationPage.passwordInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Password required' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for password too short', async () => {
    await registrationPage.passwordInput.fill(shortPassword);
    await registrationPage.passwordInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', {
      hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for password missing required character types', async () => {
    await registrationPage.passwordInput.fill('password');
    await registrationPage.passwordInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', {
      hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for empty re-enter password', async () => {
    await registrationPage.repeatPasswordInput.focus();
    await registrationPage.repeatPasswordInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Re-enter password required' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error if passwords do not match', async () => {
    await registrationPage.fillRegistrationForm({
      firstName,
      lastName,
      email,
      password,
      repeatPassword: mismatchedPassword,
    });
    await registrationPage.repeatPasswordInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', { hasText: 'Passwords do not match' })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for name too short', async () => {
    await registrationPage.firstNameInput.fill(shortName);
    await registrationPage.firstNameInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', {
      hasText: 'Name has to be from 2 to 20 characters long',
    })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for name too long', async () => {
    await registrationPage.firstNameInput.fill(longName);
    await registrationPage.firstNameInput.blur();
    await expect(registrationPage.page.locator('.invalid-feedback p', {
      hasText: 'Name has to be from 2 to 20 characters long',
    })).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should trim extra whitespace in first name', async () => {
    const nameWithWhitespace = '   John   ';
    await registrationPage.firstNameInput.fill(nameWithWhitespace);
    await registrationPage.firstNameInput.blur();
    await expect(registrationPage.firstNameInput).toHaveValue(nameWithWhitespace.trim());
  });

  test('should trim extra whitespace in last name', async () => {
    const lastNameWithWhitespace = '   Doe   ';
    await registrationPage.lastNameInput.fill(lastNameWithWhitespace);
    await registrationPage.lastNameInput.blur();
    await expect(registrationPage.lastNameInput).toHaveValue(lastNameWithWhitespace.trim());
  });

  test('should enable Register button when form is valid', async () => {
    await registrationPage.fillRegistrationForm({
      firstName,
      lastName,
      email,
      password,
      repeatPassword: password,
    });
    await expect(registrationPage.registerButton).toBeEnabled();
  });
});
