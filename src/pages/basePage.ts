import {Page} from "@playwright/test";
import {HeaderMenuControl} from "@pages/controls/headerMenuControl";

export class BasePage {
    protected readonly page: Page;
    headerMenu: HeaderMenuControl;

    constructor(page: Page) {
        this.page = page;
        this.headerMenu = new HeaderMenuControl(this.page);
    }

    async openHomePage(): Promise<void> {
        // @ts-ignore
        await this.page.goto(process.env.BASE_URL);
    }

    async logIn(): Promise<void> {
        const logInPage = await this.headerMenu.openLogInPage();
        // @ts-ignore
        await logInPage.fillLogIn(process.env.USER_NAME);
        // @ts-ignore
        await logInPage.fillPassword(process.env.PASSWORD);
        await logInPage.logInBtnControl.clickButton();
    }

}

