import { Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { LoginFormControl } from '@pages/controls/loginFormControl';
import { ButtonControl } from '@pages/controls/buttonControl';

export class HeaderMenuControl extends WebElement {
  userIcon: ButtonControl;
  favouriteIcon: ButtonControl;

  constructor(page: Page) {
    super(page);
    this.userIcon = new ButtonControl(this.page, this.page.locator('a[class*="header-office"]'));
    this.favouriteIcon = new ButtonControl(this.page, this.page.locator('a[class="header-favourite"]'));
  }

  async openLogInForm(): Promise<LoginFormControl> {
    await this.userIcon.clickButton();
    return new LoginFormControl(this.page);
  }
}
