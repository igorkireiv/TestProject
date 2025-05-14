import { Page } from '@playwright/test';
import { ItemBaseControl } from '@pages/controls/ItemBaseControl';
import { ButtonControl } from '@pages/controls/buttonControl';

export class ItemControl extends ItemBaseControl {
  protected _quantity: number;
  buyBtnControl: ButtonControl;

  constructor(page: Page, itemIndex = 0) {
    super(page);
    this.itemLoc = this.page.locator('.catalog-products .simple-slider-list__link').nth(itemIndex);
    this.nameLoc = this.itemLoc.locator('.simple-slider-list__name');
    this.descriptionLoc = this.itemLoc.locator('.simple-slider-list__description').first();
    this.priceLoc = this.itemLoc.locator('.simple-slider-list__price .price_item');
    this.optionLoc = this.itemLoc.locator('.product-item__volume-item span');
    this.imageLinkLoc = this.itemLoc.locator('.simple-slider-list__image');
    this.buyBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.button.buy'));
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  getQuantity(): number {
    return this._quantity;
  }

  async addToCart(): Promise<void> {
    await this.itemLoc.hover();
    await this.buyBtnControl.clickButton();
  }
}
