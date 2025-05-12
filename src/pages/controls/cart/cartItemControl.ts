import { Locator, Page } from '@playwright/test';
import { ButtonControl } from '@pages/controls/buttonControl';
import { ItemBaseControl } from '@pages/controls/ItemBaseControl';

export class CartItemControl extends ItemBaseControl {
  private readonly quantityLoc: Locator;
  private readonly plusBtnControl: ButtonControl;
  private readonly minusBtnControl: ButtonControl;
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
    this.minusBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-decrease'));
    this.plusBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-increase'));
    this.deleteBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-remove'));
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
      await this.plusBtnControl.clickButton();
    }
  }
}
