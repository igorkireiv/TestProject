import { Locator, Page } from '@playwright/test';
import { ButtonControl } from './buttonControl';
import { WebElement } from '@pages/controls/webElement';

export class LoginFormControl extends WebElement {
  private readonly logInFormLoc: Locator;
  private readonly titleLoc: Locator;
  private readonly emailInputLoc: Locator;
  private readonly passwordInputLoc: Locator;
  logInBtnControl: ButtonControl;

  constructor(page: Page) {
    super(page);
    this.logInFormLoc = this.page.locator('[data-popup="auth"]');
    this.titleLoc = this.logInFormLoc.locator('h2');
    this.emailInputLoc = this.logInFormLoc.locator('input[name ="user_login"]');
    this.passwordInputLoc = this.logInFormLoc.locator('input[name ="user_pw"]');
    this.logInBtnControl = new ButtonControl(this.page, this.logInFormLoc.getByRole('button', { name: 'Увійти' }));
  }

  get form(): Locator {
    return this.logInFormLoc;
  }

  get title(): Locator {
    return this.titleLoc;
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInputLoc.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInputLoc.fill(password);
  }
}
