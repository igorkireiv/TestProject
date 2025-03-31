import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";

export class HomePage extends BasePage {
    logInButtonLoc: Locator;

    constructor(page: Page) {
        super(page);
        this.logInButtonLoc = this.page.getByRole('button', { name: 'Вхід' });
    }

    async clickLogInButton(): Promise<void> {
        await this.logInButtonLoc.click();
    }
}