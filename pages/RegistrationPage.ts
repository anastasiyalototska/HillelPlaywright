import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.registrationButton = page.getByRole('button', { name: 'Registration' });
    this.firstNameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async openRegistrationForm() {
    await this.open();
    await this.signInButton.click();
    await this.registrationButton.click();
  }

  async fillRegistrationForm({ firstName, lastName, email, password, repeatPassword }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }
}