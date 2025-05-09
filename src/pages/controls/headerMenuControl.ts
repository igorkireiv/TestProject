import { Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { LoginFormControl } from '@pages/controls/loginFormControl';
import { ButtonControl } from '@pages/controls/buttonControl';
import {CartPopupControl} from "@pages/controls/cart/cartPopupControl";

export class HeaderMenuControl extends WebElement {
  userIcon: ButtonControl;
  favouriteIcon: ButtonControl;
  cartIcon: ButtonControl;
  cartPopup: CartPopupControl;

  constructor(page: Page) {
    super(page);
    this.userIcon = new ButtonControl(this.page, this.page.locator('*[class*="header-office"]'));
    this.favouriteIcon = new ButtonControl(this.page, this.page.locator('a[class="header-favourite"]'));
    this.cartIcon = new ButtonControl(this.page, this.page.locator('*[class="header-basket"]'));
    this.cartPopup = new CartPopupControl(this.page);
  }

  async openLogInForm(): Promise<LoginFormControl> {
    await this.userIcon.clickButton();
    return new LoginFormControl(this.page);
  }
}
