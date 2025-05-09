import { Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { CartItem } from '@types';
import { CartItemControl } from '@pages/controls/cart/cartItemControl';

export class CartPopupControl extends WebElement {
  constructor(page: Page) {
    super(page);
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

    for (let itemIndex = 0; itemIndex < itemsNumber; itemIndex++) {
      const item = this.getCartItemByIndex(itemsNumber);
      const itemInfo = await item.getItemInfo();
      itemsInfo.push(itemInfo);
    }

    return itemsInfo;
  }

  async clearCart(): Promise<void> {
    const deleteButton = this.page.locator('.product__button-remove"');
    const deleteButtonsNumber = await deleteButton.count();
    for (let i = 0; i < deleteButtonsNumber; i++) {
      await deleteButton.nth(i).click();
    }
  }
}
