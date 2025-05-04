import {Page} from '@playwright/test';
import {BasePage} from "@pages/basePage";
import {ButtonControl} from "@pages/controls/buttonControl";
import {ContactInfoPage} from "@pages/userPages/contactInfoPage";

export class UserPage extends BasePage {
    logOutBtnControl: ButtonControl;
    contactInfoPage: ContactInfoPage;

   constructor(page: Page) {
       super(page);
       this.contactInfoPage = new ContactInfoPage(this.page);
       this.logOutBtnControl = new ButtonControl(this.page, this.page.locator('a:has-text("Вихід")'));
   }
}
