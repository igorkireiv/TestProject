import { Page } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';

export class HomePage extends BasePage {
  headerMenu: HeaderMenuControl;

  constructor(page: Page) {
    super(page);
    this.headerMenu = new HeaderMenuControl(this.page);
  }

  async logIn(): Promise<void> {
    const logInForm = await this.headerMenu.openLogInForm();
    await logInForm.fillLogIn(process.env.EMAIL);
    await logInForm.fillPassword(process.env.PASSWORD);
    await logInForm.logInBtnControl.clickButton();
    await this.page.waitForLoadState('networkidle');
    await this.headerMenu.favouriteIcon.button.waitFor({ state: 'visible' });
  }
}
