import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { BasePage } from '@pages/basePage';
import { UserPage } from '@pages/userPages/userPage';
import { CategoryPage } from '@pages/categoryPage';
import { BrandPage } from '@pages/brandPage';
import { CheckoutPage } from '@pages/checkoutPage';

type Pages = {
  basePage: BasePage;
  homePage: HomePage;
  userPage: UserPage;
  categoryPage: CategoryPage;
  brandPage: BrandPage;
  checkoutPage: CheckoutPage;
};

const test = base.extend<Pages>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  userPage: async ({ page }, use) => {
    const userPage = new UserPage(page);
    await use(userPage);
  },
  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page);
    await use(categoryPage);
  },
  brandPage: async ({ page }, use) => {
    const brandPage = new BrandPage(page);
    await use(brandPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect, test };
