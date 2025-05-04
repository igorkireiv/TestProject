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
        const logInForm = await this.headerMenu.openLogInForm();
        // @ts-ignore
        await logInForm.fillLogIn(process.env.EMAIL);
        // @ts-ignore
        await logInForm.fillPassword(process.env.PASSWORD);
        await logInForm.logInBtnControl.clickButton();
    }
}
