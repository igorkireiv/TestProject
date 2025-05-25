import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { ItemInfo } from '@types';
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

  get name(): Locator {
    return this.nameLoc;
  }

  get description(): Locator {
    return this.descriptionLoc;
  }

  abstract getQuantity(): Promise<number> | number;

  protected async getItemOption(): Promise<string> {
    return (await this.optionLoc.innerText()).trim();
  }

  async getItemInfo(): Promise<ItemInfo> {
    await this.itemLoc.hover();
    const itemInfo: ItemInfo = {
      name: await this.nameLoc.innerText(),
      image: await this.imageLinkLoc.getAttribute('href'),
      description: await this.descriptionLoc.innerText(),
      quantity: (await this.getQuantity()) ?? 1,
    };
    if (await this.priceLoc.isVisible()) {
      itemInfo.option = await this.getItemOption();
      itemInfo.price = parsePrice(await this.priceLoc.innerText());
    }
    return itemInfo;
  }
}
