import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { BrandSearchLetter, ProductCategory } from '@data/constants';
import { test, expect } from '@fixtures/fixturePages';
import { getRandomItems, waitForPageLoad } from '../src/utils/helper';

test.describe('Brand Directory Search', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;
  const letters = [BrandSearchLetter.H, BrandSearchLetter.AMPERSAND, BrandSearchLetter.UKR_S];

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
    headerMenu = homePage.headerMenu;
  });

  letters.forEach(letter => {
    test(`Test- Open brand page and verify brands filtered by letter ${letter}`, async ({
      page,
      brandPage,
      categoryPage,
    }) => {
      await headerMenu.openCategoryByName(ProductCategory.BRANDS);
      await waitForPageLoad(page);
      await expect(brandPage.pageTitle).toHaveText(ProductCategory.BRANDS);

      await brandPage.searchByLetter(letter);
      await expect(brandPage.selectedLetter).toHaveText(letter);

      const brandNames = await brandPage.getAllBrandItems();
      for (const name of brandNames) {
        expect(name.trim().toUpperCase().startsWith(letter)).toBeTruthy();
      }

      const randomBrand = getRandomItems(brandNames, 1)[0];
      await brandPage.selectBrandFromSearchResults(randomBrand);

      await expect(categoryPage.pageTitle).toHaveText(randomBrand);
    });
  });
});
