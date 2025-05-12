import { BasePage } from '@pages/basePage';
import { Page } from '@playwright/test';
import { ItemControl } from '@pages/controls/itemControl';

export class CategoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getItemByIndex(index: number): Promise<ItemControl> {
    return new ItemControl(this.page, index);
  }
}
