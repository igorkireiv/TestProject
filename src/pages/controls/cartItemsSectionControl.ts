import { Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { ItemInfo } from '@types';
import { CartItemControl } from '@pages/controls/cart/cartItemControl';
import { parsePrice } from '../../utils/helper';

export class CartItemsSectionControl extends WebElement {
  constructor(page: Page) {
    super(page);
  }

  getCartItemByName(name: string): CartItemControl {
    return new CartItemControl(this.page, name);
  }

  getCartItemByIndex(index: number): CartItemControl {
    return new CartItemControl(this.page, index);
  }

  async getAllCartItemsInfo(): Promise<ItemInfo[]> {
    const itemsNumber = await this.page.locator('.product__column').count();

    const itemsInfo: ItemInfo[] = [];

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

  async getGiftsCount(): Promise<number> {
    // count all items with 0 price
    const itemsPrices = await this.page.locator('.product-list .product__price').allInnerTexts();
    return itemsPrices.map(price => parsePrice(price)).filter(price => price === 0).length;
  }
}
