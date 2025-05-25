import { test, expect } from '@fixtures/fixturePages';
import { ItemInfo } from '@types';
import { PageTitle, ProductCategory, userInfo } from '@data/constants';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { Faker } from '@faker';
import { waitForPageLoad } from '../src/utils/helper';

test.describe('Cart functionality', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;

  const categories = [ProductCategory.PERFUMERY, ProductCategory.MAKE_UP, ProductCategory.HEALTH_CARE];
  const addedItemsInfo: ItemInfo[] = [];

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
    await headerMenu.clearCart();
    await expect.soft(headerMenu.cartIcon.button).toHaveAttribute('class', /empty/);
  });

  test.only(`Test - Add items to cart from ${categories} categories and verify checkout info`, async ({
    page,
    categoryPage,
    checkoutPage,
  }) => {
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
      const lastAddedItem = headerMenu.cartPopup.cartItemsSection.getCartItemByIndex(0);
      await lastAddedItem.increaseAmount(itemsQuantity);
      await headerMenu.cartPopup.closeBtnControl.clickButton();
      await expect(headerMenu.cartPopup.popup).toBeHidden();

      totalItemsQuantity = totalItemsQuantity + itemsQuantity;
      await expect.soft(headerMenu.cartIcon.button).toHaveText(`${totalItemsQuantity}`, { timeout: 5000 });
    }

    await headerMenu.cartIcon.clickButton();

    const cartItemsInfo = await headerMenu.cartPopup.cartItemsSection.getAllCartItemsInfo();
    // Check items info
    await expect(cartItemsInfo).toEqual(addedItemsInfo);

    // Check total price
    const expectedTotal = addedItemsInfo.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const actualTotal = headerMenu.cartPopup.totalPrice;
    await expect.soft(actualTotal).toHaveText(expectedTotal.toString());

    // Go to Chekout page
    await headerMenu.cartPopup.chekoutBtnControl.clickButton();
    await expect.soft(checkoutPage.pageTitle).toHaveText(PageTitle.CHECKOUT_PAGE);

    // Check User info
    const actualUserInformation = await checkoutPage.getUserInfo();
    await expect.soft(actualUserInformation).toEqual(userInfo);

    // Check items info
    const checkoutItemsInfo = await checkoutPage.cartItemsSection.getAllCartItemsInfo();
    await expect(checkoutItemsInfo).toEqual(addedItemsInfo);

    // Check total price
    await expect.soft(checkoutPage.productsPrice).toHaveText(expectedTotal.toString());
    const expectedTotalPriceWithDelivery = await checkoutPage.getTotalPrice();
    await expect.soft(checkoutPage.totalPrice).toHaveText(expectedTotalPriceWithDelivery.toString());
  });

  categories.forEach(category => {
    test.skip(`Test - Update products number test for ${category} category`, async ({ homePage }) => {
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
});
