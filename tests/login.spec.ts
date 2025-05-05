import { test, expect } from '@fixtures/fixturePages';
import { userInfo } from '@data/constants';

test.describe('Log In tests', () => {
  test.setTimeout(3 * 60000000);
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.logIn();
  });

  test.only('Log In & Log Out test', async ({ homePage, userPage }) => {
    const headerMenu = homePage.headerMenu;
    await expect.soft(headerMenu.userIcon.button).toHaveAttribute('class', /\*authorized/);
    await expect.soft(headerMenu.userIcon.button).toBeVisible();
    await expect.soft(headerMenu.favouriteIcon.button).toBeVisible();

    await headerMenu.userIcon.clickButton();
    const actualUserInformation = await userPage.contactInfoPage.getUserInfo();
    await expect.soft(actualUserInformation).toEqual(userInfo);

    await userPage.logOutBtnControl.clickButton();
    await expect.soft(headerMenu.userIcon.button).not.toHaveAttribute('class', /\*authorized/);
    await expect.soft(headerMenu.favouriteIcon.button).toBeHidden();
  });
});
