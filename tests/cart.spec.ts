import { test, expect } from '@fixtures/fixturePages';
import { ItemInfo } from '@types';
import { PageTitle, ProductCategory, userInfo } from '@data/constants';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { Faker } from '@faker';
import { waitForPageLoad } from '../src/utils/helper';
import { CartPopupControl } from '@pages/controls/cart/cartPopupControl';

test.describe('Cart functionality', () => {
  test.setTimeout(3 * 60000);
  let headerMenu: HeaderMenuControl;
  let cartPopup: CartPopupControl;

  const categories = [ProductCategory.PERFUMERY, ProductCategory.MAKE_UP, ProductCategory.HEALTH_CARE];
  const addedItemsInfo: ItemInfo[] = [];

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
    cartPopup = homePage.headerMenu.cartPopup;
    await headerMenu.clearCart();
    await expect.soft(headerMenu.cartIcon.button).toHaveAttribute('class', /empty/);
  });

  test(`Test - Add items to cart from ${categories} categories and verify checkout info`, async ({
    page,
    categoryPage,
    checkoutPage,
  }) => {
    let totalItemsQuantity: number = 0;

    let giftsCount: number;
    for (const category of categories) {
      await headerMenu.openCategoryByName(category);
      await waitForPageLoad(page);
      const firstItem = await categoryPage.getItemByIndex(0);
      const itemsQuantity = Faker.getRandomNumber(1, 4);

      firstItem.quantity = itemsQuantity;
      await firstItem.waitForItemLoad();
      addedItemsInfo.push(await firstItem.getItemInfo());

      await firstItem.addToCart();
      await cartPopup.popup.waitFor({ state: 'visible' });
      giftsCount = await cartPopup.cartItemsSection.getGiftsCount();
      const itemIndex = giftsCount;
      const lastAddedItem = cartPopup.cartItemsSection.getCartItemByIndex(itemIndex);
      await lastAddedItem.increaseAmount(itemsQuantity);
      await cartPopup.closeBtnControl.clickButton();
      await expect(headerMenu.cartPopup.popup).toBeHidden();

      totalItemsQuantity = totalItemsQuantity + itemsQuantity;
    }

    await expect.soft(headerMenu.cartIcon.button).toHaveText(`${totalItemsQuantity}`, { timeout: 5000 });
    await headerMenu.cartIcon.clickButton();

    const cartItemsInfo = await cartPopup.cartItemsSection.getAllCartItemsInfo();
    // Check items info
    await expect(cartItemsInfo).toEqual(addedItemsInfo);

    // Check total price
    const expectedTotal = addedItemsInfo.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const actualTotal = cartPopup.totalPrice;
    await expect.soft(actualTotal).toHaveText(expectedTotal.toString());

    // Go to Chekout page
    await cartPopup.checkoutBtnControl.clickButton();
    await expect.soft(checkoutPage.pageTitle).toHaveText(PageTitle.CHECKOUT_PAGE);

    // Check User info
    const actualUserInformation = await checkoutPage.getUserInfo();
    delete userInfo.birthdate;
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
    test(`Test - Update products number test for ${category} category`, async ({ page, categoryPage }) => {
      await headerMenu.openCategoryByName(category);
      await waitForPageLoad(page);
      const item = await categoryPage.getItemByIndex(1);

      await item.waitForItemLoad();

      await item.addToCart();
      await cartPopup.popup.waitFor({ state: 'visible' });
      const giftsCount = await cartPopup.cartItemsSection.getGiftsCount();
      const itemIndex = giftsCount;

      const cartItemsInfo = await cartPopup.cartItemsSection.getAllCartItemsInfo();

      await expect(cartItemsInfo).toHaveLength(1);

      // Check added product quantity
      const addedItem = cartPopup.cartItemsSection.getCartItemByIndex(itemIndex);
      let itemQuantity = await addedItem.getQuantity();
      await expect(itemQuantity).toEqual(1);

      // Check total price
      const itemPrice = await addedItem.getPrice();
      let expectedTotal = itemPrice * itemQuantity;
      let actualTotal = cartPopup.totalPrice;
      await expect.soft(actualTotal).toHaveText(expectedTotal.toString());

      // Increase products quantity
      let itemsQuantityToIncrease = Faker.getRandomNumber(2, 5);
      await addedItem.increaseAmount(itemsQuantityToIncrease);

      // Check added product quantity after increase
      itemQuantity = await addedItem.getQuantity();
      await expect(itemQuantity).toEqual(itemsQuantityToIncrease);

      // Check total price after increase
      expectedTotal = itemPrice * itemQuantity;
      actualTotal = cartPopup.totalPrice;
      await expect.soft(actualTotal).toHaveText(expectedTotal.toString());

      // Decrease products quantity
      const itemsQuantityToDecrease = 1;
      await addedItem.decreaseAmount(itemsQuantityToDecrease);

      // Check added product quantity after decrease
      itemQuantity = await addedItem.getQuantity();
      await expect(itemQuantity).toEqual(itemsQuantityToIncrease - itemsQuantityToDecrease);

      // Check total price after decrease
      expectedTotal = itemPrice * itemQuantity;
      actualTotal = cartPopup.totalPrice;
      await expect.soft(actualTotal).toHaveText(expectedTotal.toString());
    });
  });
});
