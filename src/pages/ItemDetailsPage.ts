import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { ItemInfo } from '@types';
import { ButtonControl } from '@pages/controls/buttonControl';
import { parsePrice } from '../utils/helper';

export class ItemDetailsPage extends BasePage {
  private readonly itemInfoLoc: Locator;
  private readonly nameLoc: Locator;
  private readonly descriptionLoc: Locator;
  private readonly selectedOptionLoc: Locator;
  private readonly priceLoc: Locator;
  buyBtnControl: ButtonControl;

  constructor(page: Page) {
    super(page);
    this.itemInfoLoc = this.page.locator('.product-item');
    this.nameLoc = this.itemInfoLoc.locator('.product-item__name');
    this.descriptionLoc = this.itemInfoLoc.locator('.product-item__category');
    this.selectedOptionLoc = this.itemInfoLoc.locator('.product-variant-selected span span');
    this.priceLoc = page.locator('.product-item__price .price_item');
    this.buyBtnControl = new ButtonControl(this.page, this.itemInfoLoc.locator('.button.buy'));
  }

  async addToCart(): Promise<void> {
    await this.buyBtnControl.clickButton();
  }

  getItemSubCategory(): Locator {
    return this.page.locator('.product-item-tabs__content strong').filter({ hasText: 'Група товару: ' });
  }

  async getPageTitle(): Promise<string> {
    const breadcrumbLocator = this.page.locator('ol[itemtype] li span[itemprop="name"]');
    const breadcrumbItems = await breadcrumbLocator.allInnerTexts();

    return breadcrumbItems.map(text => text.trim()).join(' / ');
  }

  async getItemInfo(): Promise<ItemInfo> {
    const itemInfo: ItemInfo = {
      name: await this.nameLoc.innerText(),
      description: await this.descriptionLoc.innerText(),
    };

    if (await this.priceLoc.isVisible()) {
      itemInfo.option = (await this.selectedOptionLoc.innerText()).trim();
      itemInfo.price = parsePrice(await this.priceLoc.innerText());
    }
    return itemInfo;
  }
}
