import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { CartItem } from '@types';
import { CartItemControl } from '@pages/controls/cart/cartItemControl';
import { ButtonControl } from '@pages/controls/buttonControl';

export class CartPopupControl extends WebElement {
  private readonly popupLoc: Locator;
  private readonly totalPriceLoc: Locator;
  closeBtnControl: ButtonControl;

  constructor(page: Page) {
    super(page);
    this.popupLoc = this.page.locator('.cart');
    this.totalPriceLoc = this.page.locator('.total strong');
    this.closeBtnControl = new ButtonControl(this.page, this.popupLoc.locator('.close-icon'));
  }

  get popup(): Locator {
    return this.popupLoc;
  }

  get totalPrice(): Locator {
    return this.totalPriceLoc;
  }

  getCartItemByName(name: string): CartItemControl {
    return new CartItemControl(this.page, name);
  }

  getCartItemByIndex(index: number): CartItemControl {
    return new CartItemControl(this.page, index);
  }

  async getAllCartItemsInfo(): Promise<CartItem[]> {
    const itemsNumber = await this.page.locator('.product__column').count();

    const itemsInfo: CartItem[] = [];

    for (let itemIndex = itemsNumber - 1; itemIndex >= 0; itemIndex--) {
      const item = this.getCartItemByIndex(itemIndex);
      const itemInfo = await item.getItemInfo();
      // if item is gift it has 0 price and should be skipped
      if (itemInfo.price !== 0) {
        itemsInfo.push({ ...itemInfo, price: itemInfo.price / (await item.getQuantity()) });
      }
    }

    return itemsInfo;
  }
}
