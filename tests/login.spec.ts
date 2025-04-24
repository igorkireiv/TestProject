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
        await expect.soft(headerMenu.userMenuIcon.button).toBeVisible();

        await headerMenu.userMenuIcon.clickButton();
        await headerMenu.userMenu.logOutBtnControl.clickButton();

        await expect.soft(headerMenu.logInBtnControl.button).toBeVisible();
        await expect.soft(headerMenu.userMenuIcon.button).toBeHidden();
    });
});


