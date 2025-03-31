import {Page} from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openHomePage(): Promise<void> {
        await this.page.goto('https://shafa.ua/uk/');
    }
}

