import { test as base } from '@playwright/test';
import {HomePage} from "../pages/homePage";
import {LoginPage} from "../pages/loginPage";
import {BasePage} from "../pages/basePage";
type Pages = {
        homePage: HomePage;
        loginPage: LoginPage;
        basePage: BasePage;
        };
export const test = base.extend<Pages>({
    homePage: async ({page},use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    basePage: async ({page},use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    loginPage: async ({page},use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },


  
});