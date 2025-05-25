import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { ButtonControl } from '@pages/controls/buttonControl';
import { CartItemsSectionControl } from '@pages/controls/cartItemsSectionControl';

export class CartPopupControl extends WebElement {
  private readonly popupLoc: Locator;
  private readonly totalPriceLoc: Locator;
  cartItemsSection: CartItemsSectionControl;
  closeBtnControl: ButtonControl;
  checkoutBtnControl: ButtonControl;

  constructor(page: Page) {
    super(page);
    this.popupLoc = this.page.locator('.cart');
    this.totalPriceLoc = this.page.locator('.total strong');
    this.closeBtnControl = new ButtonControl(this.page, this.popupLoc.locator('.close-icon'));
    this.checkoutBtnControl = new ButtonControl(this.page, this.popupLoc.locator('[data-location="/ua/checkout/"]'));
    this.cartItemsSection = new CartItemsSectionControl(this.page);
  }

  get popup(): Locator {
    return this.popupLoc;
  }

  get totalPrice(): Locator {
    return this.totalPriceLoc;
  }
}
