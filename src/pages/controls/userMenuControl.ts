import {Locator, Page} from "@playwright/test";
import {WebElement} from "@pages/controls/webElement";
import {ButtonControl} from "@pages/controls/buttonControl";

export class UserMenuControl extends WebElement {
    private readonly userMenuLoc: Locator;
    logOutBtnControl: ButtonControl;


    constructor(page: Page) {
        super(page);
        this.userMenuLoc = this.page.locator('//ul//parent::div').first();
        this.logOutBtnControl = new ButtonControl(this.page, this.userMenuLoc.getByRole('link', {name: 'Вихід'}));
    }
}