import { Page } from '@playwright/test';

export class WebElement {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
