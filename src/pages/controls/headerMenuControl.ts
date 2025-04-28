import {Page} from "@playwright/test";
import {WebElement} from "@pages/controls/webElement";
import {LoginPage} from "@pages/loginPage";
import {ButtonControl} from "@pages/controls/buttonControl";
import {UserMenuControl} from "@pages/controls/userMenuControl";

export class HeaderMenuControl extends WebElement {
    logInBtnControl: ButtonControl;
    userMenuIcon: ButtonControl;
    userMenu: UserMenuControl;

    constructor(page: Page) {
        super(page);
        this.logInBtnControl = new ButtonControl(this.page, this.page.getByRole('button', {name: 'Вхід'}));
        this.userMenuIcon = new ButtonControl(this.page, this.page.locator('button img[alt="avatar"]').first());
        this.userMenu = new UserMenuControl(this.page);
    }

    async openLogInPage(): Promise<LoginPage> {
        await this.logInBtnControl.clickButton();
        return new LoginPage(this.page);
    }

}