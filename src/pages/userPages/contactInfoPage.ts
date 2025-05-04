import {Locator, Page} from '@playwright/test';
import {BasePage} from "@pages/basePage";
import {UserInfo} from "../../utils/types";

export class ContactInfoPage extends BasePage {
    private readonly usernameFieldLoc: Locator;
    private readonly surnameFieldLoc: Locator;
    private readonly emailFieldLoc: Locator;
    private readonly birthdateFieldLoc: Locator;
    private readonly phoneNumberFieldLoc: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameFieldLoc = this.page.locator('[id="name"]');
        this.surnameFieldLoc = this.page.locator('[id="surname"]');
        this.emailFieldLoc = this.page.locator('[id="email"]');
        this.birthdateFieldLoc = this.page.locator('[id="birthday"]');
        this.phoneNumberFieldLoc = this.page.locator('[id="phone"]');

    }

    get usernameField() {
        return this.usernameFieldLoc;
    }

    async getUserInfo(): Promise<UserInfo> {
        return {
            username: await this.usernameFieldLoc.inputValue(),
            surname: await this.surnameFieldLoc.inputValue(),
            email: await this.emailFieldLoc.inputValue(),
            birthdate: await this.birthdateFieldLoc.inputValue(),
            phoneNumber: await this.phoneNumberFieldLoc.inputValue(),

        };
    }
}
