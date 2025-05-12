import { Locator, Page } from '@playwright/test';
import { WebElement } from '@pages/controls/webElement';

export class ButtonControl extends WebElement {
  private readonly btnLoc: Locator;

  constructor(page: Page, btnLoc: Locator | string) {
    super(page);
    this.btnLoc = typeof btnLoc === 'string' ? this.page.locator(btnLoc) : btnLoc;
  }

  get button(): Locator {
    return this.btnLoc;
  }

  async clickButton(hover?: boolean): Promise<void> {
    if (hover) {
      await this.btnLoc.hover();
    }
    await this.btnLoc.click();
  }
}
