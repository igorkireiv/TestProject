import { test, expect } from '@fixtures/fixturePages';
import { logInFormTitle, userInfo } from '@data/constants';
import { HeaderMenuControl } from '@pages/controls/headerMenuControl';
import { Faker } from '@faker';
import { LoginFormControl } from '@pages/controls/loginFormControl';

test.describe('Log In functionality', () => {
  test.setTimeout(2 * 60000);
  let headerMenu: HeaderMenuControl;
  let logInForm: LoginFormControl;

  test.beforeEach(async ({ homePage }) => {
    headerMenu = homePage.headerMenu;

    await homePage.openHomePage();
  });

  test('Test - Log In & Log Out', async ({ page, userPage }) => {
    logInForm = await headerMenu.openLogInForm();
    await expect(logInForm.form).toBeVisible();
    await expect(logInForm.title).toHaveText(logInFormTitle);

    await logInForm.fillEmail(process.env.EMAIL);
    await logInForm.fillPassword(process.env.PASSWORD);
    await logInForm.logInBtnControl.clickButton();
    await page.waitForLoadState('networkidle');

    await expect(logInForm.form).toBeHidden();

    await expect.soft(headerMenu.userIcon.button).toHaveAttribute('class', /authorized/);
    await expect.soft(headerMenu.userIcon.button).toBeVisible();
    await expect.soft(headerMenu.favouriteIcon.button).toBeVisible();

    await headerMenu.userIcon.clickButton();
    const actualUserInformation = await userPage.contactInfoPage.getUserInfo();
    await expect.soft(actualUserInformation).toEqual(userInfo);

    await userPage.logOutBtnControl.clickButton();
    await expect.soft(headerMenu.userIcon.button).not.toHaveAttribute('class', /authorized/);
    await expect.soft(headerMenu.favouriteIcon.button).toBeHidden();
  });

  test('Test - Log In with invalid credentials', async ({ page, userPage }) => {
    logInForm = await headerMenu.openLogInForm();
    await expect(logInForm.form).toBeVisible();
    await expect(logInForm.title).toHaveText(logInFormTitle);

    await logInForm.fillEmail(Faker.getFakeEmail());
    await logInForm.fillPassword(Faker.getFakePassword());
    await logInForm.logInBtnControl.clickButton();

    await expect.soft(logInForm.form).toBeVisible();

    await logInForm.fillEmail(process.env.EMAIL);
    await logInForm.fillPassword(process.env.PASSWORD);
    await logInForm.logInBtnControl.clickButton();
    await page.waitForLoadState('networkidle');

    await expect(logInForm.form).toBeHidden();

    await expect.soft(headerMenu.userIcon.button).toHaveAttribute('class', /authorized/);
    await expect.soft(headerMenu.userIcon.button).toBeVisible();
    await expect.soft(headerMenu.favouriteIcon.button).toBeVisible();

    await headerMenu.userIcon.clickButton();
    const actualUserInformation = await userPage.contactInfoPage.getUserInfo();
    await expect.soft(actualUserInformation).toEqual(userInfo);
  });
});
