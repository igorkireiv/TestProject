import { Locator, Page } from '@playwright/test';
import { ButtonControl } from '@pages/controls/buttonControl';
import { ItemBaseControl } from '@pages/controls/ItemBaseControl';
import { parsePrice } from '../../../utils/helper';
import { CartItemsSectionControl } from '@pages/controls/cartItemsSectionControl';

export class CartItemControl extends ItemBaseControl {
  private readonly quantityLoc: Locator;
  private readonly deleteBtnControl: ButtonControl;

  constructor(page: Page, nameOrId: string | number) {
    super(page);
    this.itemLoc = this.getItemLocator(nameOrId);
    this.nameLoc = this.itemLoc.locator('.product__header');
    this.imageLinkLoc = this.itemLoc.locator('.product__image');
    this.descriptionLoc = this.itemLoc.locator('.product__header-desc');
    this.optionLoc = this.itemLoc.locator('.product__header-option');
    this.quantityLoc = this.itemLoc.locator('[name="count[]"]');
    this.priceLoc = this.itemLoc.locator('.product__price');
    this.deleteBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-remove'));
  }

  async getPrice(): Promise<number> {
    return parsePrice(await this.priceLoc.innerText());
  }

  async getQuantity(): Promise<number> {
    return Number.parseInt(await this.quantityLoc.inputValue());
  }

  private getItemLocator(nameOrId: string | number): Locator {
    const itemLoc = this.page.locator('li[class^="product-list__item"]');
    return typeof nameOrId === 'string'
      ? itemLoc.filter({ has: this.page.locator(`.product__header:has-text("${nameOrId}")`) })
      : itemLoc.nth(nameOrId);
  }

  async increaseAmount(amount: number) {
    for (let clickIndex = 1; clickIndex < amount; clickIndex++) {
      const giftsCount = await CartItemsSectionControl.getGiftsCount(this.page);
      const plusBtnControl = this.getItemLocator(giftsCount).locator('.product__button-increase');
      await plusBtnControl.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async decreaseAmount(amount: number) {
    for (let clickIndex = 1; clickIndex <= amount; clickIndex++) {
      const giftsCount = await CartItemsSectionControl.getGiftsCount(this.page);
      const minusBtnControl = this.getItemLocator(giftsCount).locator('.product__button-decrease');
      await minusBtnControl.click();
      await this.page.waitForTimeout(2000);
    }
  }
}
