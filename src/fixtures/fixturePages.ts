import {test as base, expect} from '@playwright/test';
import {HomePage} from "@pages/homePage";
import {LoginPage} from "@pages/loginPage";
import {BasePage} from "@pages/basePage";

type Pages = {
    basePage: BasePage;
    homePage: HomePage;
    loginPage: LoginPage;
};

const test = base.extend<Pages>({
    basePage: async ({page}, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export {expect, test} ;
