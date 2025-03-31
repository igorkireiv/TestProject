
import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";
export class LoginPage extends BasePage {
    logInButtonLoc: Locator;
    logInInputLoc: Locator;
    passwordInputLoc: Locator;

    constructor(page: Page) {
        super(page);
        this.logInInputLoc = this.page.locator("input[name = 'username']");
        this.passwordInputLoc = this.page.locator("input[name='password']");
        this.logInButtonLoc = this.page.getByRole('button', { name: 'Увійти' });
    }

    async clickLogInButton(): Promise<void> {
        await this.logInButtonLoc.click();
    }

    async fillLogInButton(username: string): Promise<void> {
        await this.logInInputLoc.fill(username)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInputLoc.fill(password)
    }
}
