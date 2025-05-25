import { test, expect } from '@fixtures/fixturePages';
import { Filter, ProductCategory } from '@data/constants';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { waitForPageLoad } from '../src/utils/helper';

test.describe('Filters functionality', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
  });

  test.skip('Test - Filter by Brand', async ({ page, categoryPage }) => {
    const productCategory = ProductCategory.PERFUMERY;
    await headerMenu.openCategoryByName(productCategory);

    const brandFilter = Filter.BRAND;
    const randomBrands = await categoryPage.getRandomFilterItems(brandFilter, 2);

    for (const brandName of randomBrands) {
      await headerMenu.openCategoryByName(productCategory); // open page to reset last filter
      await categoryPage.applyFilter(brandFilter, brandName);
      await waitForPageLoad(page);

      const itemsNumber = await categoryPage.getItemsNumber();
      expect(itemsNumber).toBeGreaterThan(0);

      for (let itemIndex = 0; itemIndex < itemsNumber; itemIndex++) {
        const item = await categoryPage.getItemByIndex(itemIndex);
        expect.soft(item.name).toContainText(brandName, { ignoreCase: true });
      }
    }
  });

  test('Test - Filter by Product Group', async ({ page, categoryPage }) => {
    const productCategory = ProductCategory.MAKE_UP;
    await headerMenu.openCategoryByName(productCategory);

    const brandFilter = Filter.PRODUCT_GROUP;
    const randomGroups = await categoryPage.getRandomFilterItems(brandFilter, 3);

    for (const groupName of randomGroups) {
      await headerMenu.openCategoryByName(productCategory); // open page to reset last filter
      await categoryPage.applyFilter(brandFilter, groupName);
      await waitForPageLoad(page);

      const itemsNumber = await categoryPage.getItemsNumber();
      expect(itemsNumber).toBeGreaterThan(0);
      const firstItem = await categoryPage.getItemByIndex(0);
      const itemName = (await firstItem.getItemInfo()).name;
      const itemDetailsPage = await firstItem.open();
      expect.soft(await itemDetailsPage.getPageTitle()).toContain(productCategory);
      expect.soft(await itemDetailsPage.getPageTitle()).toContain(itemName);
      expect.soft(itemDetailsPage.getItemSubCategory()).toContainText(groupName);
    }
  });
});
