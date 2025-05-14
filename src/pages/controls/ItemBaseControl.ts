import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { CartItem } from '@types';
import { parsePrice } from '../../utils/helper';

export abstract class ItemBaseControl extends WebElement {
  protected itemLoc: Locator;
  protected nameLoc: Locator;
  protected imageLinkLoc: Locator;
  protected descriptionLoc: Locator;
  protected optionLoc: Locator;
  protected priceLoc: Locator;

  protected constructor(page: Page) {
    super(page);
  }

  abstract getQuantity(): Promise<number> | number;

  private async getItemOption(): Promise<string> {
    return (await this.optionLoc.innerText()).trim();
  }

  async getItemInfo(): Promise<CartItem> {
    await this.itemLoc.hover();
    return {
      name: await this.nameLoc.innerText(),
      image: await this.imageLinkLoc.getAttribute('href'),
      description: await this.descriptionLoc.innerText(),
      option: await this.getItemOption(),
      quantity: await this.getQuantity() ?? 1,
      price: parsePrice(await this.priceLoc.innerText()),
    };
  }
}
