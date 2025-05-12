import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { LoginFormControl } from '@pages/controls/loginFormControl';
import { ButtonControl } from '@pages/controls/buttonControl';
import { CartPopupControl } from '@pages/controls/cart/cartPopupControl';
import { waitForPageLoad } from '../../utils/helper';

export class HeaderMenuControl extends WebElement {
  private readonly categoryMenuItem: Locator;
  userIcon: ButtonControl;
  favouriteIcon: ButtonControl;
  cartIcon: ButtonControl;
  cartPopup: CartPopupControl;

  constructor(page: Page) {
    super(page);
    this.categoryMenuItem = this.page.locator('.menu-list__item .menu-list__link_category');
    this.userIcon = new ButtonControl(this.page, this.page.locator('*[class*="header-office"]'));
    this.favouriteIcon = new ButtonControl(this.page, this.page.locator('a[class="header-favourite"]'));
    this.cartIcon = new ButtonControl(this.page, this.page.locator('.header-basket'));
    this.cartPopup = new CartPopupControl(this.page);
  }

  async openLogInForm(): Promise<LoginFormControl> {
    await this.userIcon.clickButton();
    return new LoginFormControl(this.page);
  }

  async openCategoryByName(name: string): Promise<void> {
    await this.categoryMenuItem.filter({ hasText: name }).click();
    await waitForPageLoad(this.page);
  }

  async clearCart(): Promise<void> {
    if (!(await this.cartIcon.button.getAttribute('class')).includes('empty')) {
      await this.cartIcon.clickButton();
      await this.cartPopup.popup.waitFor({ state: 'visible' });

      const deleteButton = this.page.locator('.product__button-remove');
      const deleteButtonCount = await this.page.locator('.product__button-remove').count();
      for (let i = deleteButtonCount - 1; i >= 0; i--) {
        await deleteButton.nth(i).click();
        await this.page.waitForTimeout(100);
      }
    }
  }
}
