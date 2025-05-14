import { test, expect } from '@fixtures/fixturePages';
import { Filter, ProductCategory } from '@data/constants';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { getRandomItems } from '../src/utils/helper';

test.describe('Filters functionality', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
  });

  test.only('Test - Filter by Brand', async ({ categoryPage }) => {
    const productCategory = ProductCategory.PERFUMERY;
    await headerMenu.openCategoryByName(productCategory);

    const brandFilter = Filter.BRAND;
    const randomBrands = await categoryPage.getRandomFilterItems(brandFilter, 2);

    for (const brandName of randomBrands) {
      await headerMenu.openCategoryByName(productCategory); // open page to reset last filter
      await categoryPage.applyFilter(brandFilter, brandName);

      const itemsInfo = await categoryPage.getAllItemsInfo();
      expect(itemsInfo.length).toBeGreaterThan(0);

      for (const item of itemsInfo) {
        expect.soft(item.name).toContain(brandName.toLowerCase());
      }
    }
  });

  test('Test - Filter by Product Group', async ({ categoryPage }) => {
    const productCategory = ProductCategory.MAKE_UP;
    await headerMenu.openCategoryByName(productCategory);

    const brandFilter = Filter.PRODUCT_GROUP;
    const randomGroups = await categoryPage.getRandomFilterItems(brandFilter, 3);

    for (const groupName of randomGroups) {
      await headerMenu.openCategoryByName(productCategory); // open page to reset last filter
      await categoryPage.applyFilter(brandFilter, groupName);

      const itemsInfo = await categoryPage.getAllItemsInfo();
      expect(itemsInfo.length).toBeGreaterThan(0);

      for (const item of itemsInfo) {
        expect.soft(item.description).toContain(groupName.toLowerCase());
      }
    }
  });
});
