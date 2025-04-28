import {Page} from "@playwright/test";
import {HeaderMenuControl} from "@pages/controls/headerMenuControl";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openHomePage(): Promise<void> {
        // @ts-ignore
        await this.page.goto(process.env.BASE_URL);
    }
}

