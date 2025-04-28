import {Page} from "@playwright/test";
import {BasePage} from "@pages/basePage";
import {HeaderMenuControl} from "@pages/controls/headerMenuControl";

export class HomePage extends BasePage {
    headerMenu: HeaderMenuControl;

    constructor(page: Page) {
        super(page);
        this.headerMenu = new HeaderMenuControl(this.page);

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
