import { test, expect } from '@fixtures/fixturePages';
import { CartItem } from '@types';
import { ProductCategory } from '@data/constants';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { Faker } from '@faker';
import { waitForPageLoad } from '../src/utils/helper';

test.describe('Cart functionality', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;

  const categories = [ProductCategory.PERFUMERY, ProductCategory.MAKE_UP, ProductCategory.HEALTH_CARE];
  const addedItemsInfo: CartItem[] = [];

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
    await headerMenu.clearCart();
    await expect.soft(headerMenu.cartIcon.button).toHaveAttribute('class', /empty/);
  });

  test.only('Test - Add items to cart', async ({ page, categoryPage }) => {
    let totalItemsQuantity: number = 0;

    for (const category of categories) {
      await headerMenu.openCategoryByName(category);
      await waitForPageLoad(page);
      const firstItem = await categoryPage.getItemByIndex(0);
      const itemsQuantity = Faker.getRandomNumber(1, 4);

      firstItem.quantity = itemsQuantity;
      await firstItem.waitForItemLoad();
      addedItemsInfo.push(await firstItem.getItemInfo());

      await firstItem.addToCart();
      await headerMenu.cartPopup.popup.waitFor({ state: 'visible' });
      const lastAddedItem = headerMenu.cartPopup.getCartItemByIndex(0);
      await lastAddedItem.increaseAmount(itemsQuantity);
      await headerMenu.cartPopup.closeBtnControl.clickButton();
      await expect(headerMenu.cartPopup.popup).toBeHidden();

      totalItemsQuantity = totalItemsQuantity + itemsQuantity;
      await expect.soft(headerMenu.cartIcon.button).toHaveText(`${totalItemsQuantity}`, { timeout: 5000 });
    }

    await headerMenu.cartIcon.clickButton();

    const cartItemsInfo = await headerMenu.cartPopup.getAllCartItemsInfo();

    // Check items info
    await expect(cartItemsInfo).toEqual(addedItemsInfo);

    // Check total price
    const expectedTotal = addedItemsInfo.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const actualTotal = headerMenu.cartPopup.totalPrice;
    await expect.soft(actualTotal).toHaveText(expectedTotal.toString());
  });

  test.skip('Update products number test', async ({ homePage }) => {
    // await headerMenu.openCategoryByName(ProductCategory.ACCESSORIES_AND_EQUIPMENT);
    //
    // const title = await homePage.getFirstProductTitle();
    // const price = await homePage.getFirstProductPrice();
    //
    // await homePage.addFirstProductToCart();
    //
    // await cartPage.open();
    //
    // await cartPage.setProductQuantity(title, 3);
    //
    // const cartItem = await cartPage.getCartItemByTitle(title);
    //
    // expect(cartItem).toBeTruthy();
    // expect(cartItem!.price).toBe(price);
    // expect(cartItem!.quantity).toBe(3);
    // expect(cartItem!.total).toBe(price * 3);
    //
    // const cartTotal = await cartPage.getCartTotalPrice();
    // expect(cartTotal).toBe(price * 3);
  });
});
