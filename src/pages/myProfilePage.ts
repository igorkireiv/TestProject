import {Locator, Page} from '@playwright/test';
import {BasePage} from "@pages/basePage";

export class MyProfilePage extends BasePage {
    private readonly usernameFieldLoc: Locator;

   constructor(page: Page) {
       super(page);
       this.usernameFieldLoc = this.page.locator("input[name = 'username']");
   }

   get usernameField() {
       return this.usernameFieldLoc;
   }
}
