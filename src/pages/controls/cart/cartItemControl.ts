import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';
import { CartItem } from '@types';
import { ButtonControl } from '@pages/controls/buttonControl';

export class CartItemControl extends WebElement {
  private readonly itemLoc: Locator;
  private readonly titleLoc: Locator;
  private readonly descriptionLoc: Locator;
  private readonly optionLoc: Locator;
  private readonly quantityLoc: Locator;
  private readonly priceLoc: Locator;
  private readonly plusBtnControl: ButtonControl;
  private readonly minusBtnControl: ButtonControl;
  private readonly deleteBtnControl: ButtonControl;

  constructor(page: Page, nameOrId: string | number) {
    super(page);
    this.itemLoc = this.getItemLocator(nameOrId);
    this.titleLoc = this.itemLoc.locator('.product__header');
    this.descriptionLoc = this.itemLoc.locator('.product__header-desc');
    this.optionLoc = this.itemLoc.locator('.product__header-option');
    this.quantityLoc = this.itemLoc.locator('[name="count[]"]');
    this.priceLoc = this.itemLoc.locator('.product__price');
    this.minusBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-decrease'));
    this.plusBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-increase'));
    this.deleteBtnControl = new ButtonControl(this.page, this.itemLoc.locator('.product__button-remove'));
  }

  private getItemLocator(nameOrId: string | number): Locator {
    const itemLoc = this.page.locator('li[class^="product-list__item"]');
    return typeof nameOrId === 'string'
      ? itemLoc.filter({ has: this.page.locator(`.product__header:has-text("${nameOrId}")`) })
      : itemLoc.nth(nameOrId);
  }

  async getItemInfo(): Promise<CartItem> {
    return {
      title: await this.titleLoc.innerText(),
      description: await this.descriptionLoc.innerText(),
      option: await this.optionLoc.innerText(),
      quantity: Number.parseInt(await this.quantityLoc.inputValue()),
      price: await this.priceLoc.innerText(),
    };
  }
}
