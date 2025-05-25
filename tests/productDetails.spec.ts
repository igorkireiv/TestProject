import { test, expect } from '@fixtures/fixturePages';
import { ProductCategory } from '@data/constants';
import { waitForPageLoad } from '../src/utils/helper';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';

test.describe('Product Details Page', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;
  const testCategoriesData = [ProductCategory.PERFUMERY, ProductCategory.FACE, ProductCategory.GIFTS];

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
  });

  testCategoriesData.forEach(category => {
    test(`Test - Item info on ${category} Category Page and Item Details Page compare`, async ({
      page,
      categoryPage,
    }) => {
      await headerMenu.openCategoryByName(category);
      await waitForPageLoad(page);
      const item = await categoryPage.getItemByIndex(0);
      const categoryPageItemInfo = await item.getItemInfo();
      delete categoryPageItemInfo.image;
      delete categoryPageItemInfo.quantity;

      const itemDetailsPage = await item.open();
      await waitForPageLoad(page);
      const itemInfo = await itemDetailsPage.getItemInfo();
      await expect.soft(categoryPageItemInfo).toEqual(itemInfo);
    });

    test(`Test - Unavailable item info on ${category} Category Page and Item Details Page compare`, async ({
      page,
      categoryPage,
    }) => {
      await headerMenu.openCategoryByName(category);
      await waitForPageLoad(page);
      const item = await categoryPage.getItemByIndex(0);
      const categoryPageItemInfo = await item.getItemInfo();
      delete categoryPageItemInfo.image;
      delete categoryPageItemInfo.quantity;

      const itemDetailsPage = await item.open();
      await waitForPageLoad(page);
      const itemInfo = await itemDetailsPage.getItemInfo();
      await expect.soft(await itemDetailsPage.getPageTitle()).toContain(itemInfo.name);
      await expect.soft(categoryPageItemInfo).toEqual(itemInfo);
    });
  });
});
