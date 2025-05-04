import {Locator, Page} from "@playwright/test";
import {ButtonControl} from "./buttonControl";
import {WebElement} from "@pages/controls/webElement";

export class LoginFormControl extends WebElement {
    private readonly logInInputLoc: Locator;
    private readonly passwordInputLoc: Locator;
    logInBtnControl: ButtonControl;

    constructor(page: Page) {
        super(page);
        this.logInInputLoc = this.page.locator("input[name = 'user_login']");
        this.passwordInputLoc = this.page.locator("input[name = 'password']");
        this.logInBtnControl = new ButtonControl(this.page, this.page.getByRole('button', {name: 'Увійти'}));
    }

    async fillLogIn(email: string): Promise<void> {
        await this.logInInputLoc.fill(email)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInputLoc.fill(password)
    }
}
