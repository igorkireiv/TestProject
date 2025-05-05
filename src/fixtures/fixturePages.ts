import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { BasePage } from '@pages/basePage';
import { UserPage } from '@pages/userPages/userPage';

type Pages = {
  basePage: BasePage;
  homePage: HomePage;
  userPage: UserPage;
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
});

export { expect, test };
