import {test, expect} from '@fixtures/fixturePages';



test.describe('Log In tests', () => {
    test.setTimeout(3*60000000);
    test.beforeEach(async ({homePage}) => {
        await homePage.openHomePage();
    });

    test.only('Log In & Log Out test', async ({homePage}) => {
        await homePage.logIn();
        const headerMenu = homePage.headerMenu;
        await expect.soft(headerMenu.logInBtnControl.button).toBeHidden();
        await expect.soft(headerMenu.userIcon.button).toBeVisible();

        await headerMenu.userIcon.clickButton();
        await myProfilePage.logOutBtnControl.clickButton();

        await expect.soft(headerMenu.logInBtnControl.button).toBeVisible();
        await expect.soft(headerMenu.userIcon.button).toBeHidden();
    });

    test('Check Username', async ({homePage}) => {
        await homePage.logIn();
        const headerMenu = homePage.headerMenu;
        await headerMenu.userIcon.clickButton();
        await headerMenu.userMenu.myProfileBtnControl.clickButton();

    });
});


