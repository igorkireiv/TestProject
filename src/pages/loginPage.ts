
import {Locator, Page} from "@playwright/test";
import {ButtonControl} from "@pages/controls/buttonControl";
import {BasePage} from "./basePage";

export class LoginPage extends BasePage {
    logInBtnControl: ButtonControl;
    private readonly logInInputLoc: Locator;
    private readonly passwordInputLoc: Locator;

    constructor(page: Page) {
        super(page);
        this.logInInputLoc = this.page.locator("input[name = 'username']");
        this.passwordInputLoc = this.page.locator("input[name = 'password']");
        this.logInBtnControl = new ButtonControl(this.page, this.page.getByRole('button', { name: 'Увійти' }));
    }

    async fillLogIn(username: string): Promise<void> {
        await this.logInInputLoc.fill(username)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInputLoc.fill(password)
    }
}
