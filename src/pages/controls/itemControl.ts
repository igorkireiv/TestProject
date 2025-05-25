import { Page } from '@playwright/test';
import { ItemBaseControl } from '@pages/controls/ItemBaseControl';
import { ButtonControl } from '@pages/controls/buttonControl';
import { normalizeText } from '../../utils/helper';
import { ItemDetailsPage } from '@pages/ItemDetailsPage';

export class ItemControl extends ItemBaseControl {
  protected _quantity: number;
  buyBtnControl: ButtonControl;

  constructor(page: Page, itemIndex = 0) {
    super(page);
    this.itemLoc = this.page.locator('.catalog-products .simple-slider-list__link').nth(itemIndex);
    this.nameLoc = this.itemLoc.locator('.simple-slider-list__name');
    this.descriptionLoc = this.itemLoc.locator('.simple-slider-list__description').first();
    this.priceLoc = this.itemLoc.locator('.simple-slider-list__price .price_item');
    this.optionLoc = this.itemLoc.locator('.product-item__volume-item .variant.checked');
    this.imageLinkLoc = this.itemLoc.locator('.simple-slider-list__image');
    this.buyBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.button.buy'));
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  getQuantity(): number {
    return this._quantity;
  }

  protected async getItemOption(): Promise<string> {
    return normalizeText(await this.optionLoc.getAttribute('title'));
  }

  async open(): Promise<ItemDetailsPage> {
    await this.itemLoc.click();
    return new ItemDetailsPage(this.page);
  }

  async addToCart(): Promise<void> {
    await this.itemLoc.hover();
    await this.buyBtnControl.button.waitFor({ state: 'visible' });
    await this.buyBtnControl.clickButton();
  }

  async waitForItemLoad(): Promise<void> {
    await this.itemLoc.hover();
    await this.page.locator('li').filter({ has: this.itemLoc }).locator('.loading-block').waitFor({ state: 'hidden' });
  }
}
