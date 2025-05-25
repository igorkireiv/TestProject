import { BasePage } from '@pages/basePage';
import { Locator, Page } from '@playwright/test';
import { parsePrice } from '../utils/helper';
import { UserInfo } from '@types';
import { CartItemsSectionControl } from '@pages/controls/cartItemsSectionControl';

export class CheckoutPage extends BasePage {
  private readonly pageTitleLoc: Locator;
  private readonly userInfoSectionLoc: Locator;
  private readonly productsPriceLoc: Locator;
  private readonly deliveryPriceLoc: Locator;
  private readonly totalPriceLoc: Locator;
  cartItemsSection: CartItemsSectionControl;

  constructor(page: Page) {
    super(page);
    this.pageTitleLoc = this.page.locator('h1.page-header');
    this.userInfoSectionLoc = this.page.locator('[id=checkout-user-personal-data] dd');
    this.productsPriceLoc = this.page.locator('[id="chk_pred_cost"]');
    this.deliveryPriceLoc = this.page.locator('[id="chk_delivery_cost"]');
    this.totalPriceLoc = this.page.locator('[id="chk_order_total"]');
    this.cartItemsSection = new CartItemsSectionControl(this.page);
  }

  get pageTitle(): Locator {
    return this.pageTitleLoc;
  }

  get productsPrice(): Locator {
    return this.productsPriceLoc;
  }

  get deliveryPrice(): Locator {
    return this.deliveryPriceLoc;
  }

  get totalPrice(): Locator {
    return this.totalPriceLoc;
  }

  async getTotalPrice(): Promise<number> {
    const productsPrice = parsePrice(await this.productsPrice.innerText());
    const deliveryPrice = parsePrice(await this.deliveryPriceLoc.innerText());
    return productsPrice + deliveryPrice;
  }

  async getUserInfo(): Promise<UserInfo> {
    const nameAndSecondName = (await this.userInfoSectionLoc.nth(0).innerText()).trim().split(' ');
    return {
      username: nameAndSecondName[0],
      surname: nameAndSecondName[1],
      email: await this.userInfoSectionLoc.nth(1).innerText(),
      phoneNumber: await this.userInfoSectionLoc.nth(2).innerText(),
    };
  }
}
