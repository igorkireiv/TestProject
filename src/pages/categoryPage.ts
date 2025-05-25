import { BasePage } from '@pages/basePage';
import { Locator, Page } from '@playwright/test';
import { ItemControl } from '@pages/controls/itemControl';
import { getRandomItems, waitForPageLoad } from '../utils/helper';
import { ItemInfo } from '@types';

export class CategoryPage extends BasePage {
  private readonly filterBlockLoc: Locator;
  private readonly pageTitleLoc: Locator;

  constructor(page: Page) {
    super(page);
    this.filterBlockLoc = this.page.locator('.catalog-filter-block');
    this.pageTitleLoc = this.page.locator('h1.page-header');
  }

  get pageTitle(): Locator {
    return this.pageTitleLoc;
  }

  async getItemByIndex(index: number): Promise<ItemControl> {
    return new ItemControl(this.page, index);
  }

  async getItemsNumber(): Promise<number> {
    return await this.page.locator('.catalog-products .simple-slider-list__link').count();
  }

  async getAllItemsInfo(): Promise<ItemInfo[]> {
    const itemsNumber = await this.getItemsNumber();

    const itemsInfo: ItemInfo[] = [];

    for (let itemIndex = itemsNumber - 1; itemIndex >= 0; itemIndex--) {
      const item = await this.getItemByIndex(itemIndex);
      await item.waitForItemLoad();
      const itemInfo = await item.getItemInfo();
      itemsInfo.push(itemInfo);
    }

    return itemsInfo;
  }

  async getRandomFilterItems(filterName: string, count: number): Promise<string[]> {
    const filterBlock = this.filterBlockLoc.filter({ has: this.page.locator(`[data-option-name="${filterName}"]`) });

    const filterItemsLoc = filterBlock.locator('[data-filter-variant-name]').all();
    const randomFilterItems = getRandomItems(await filterItemsLoc, count);

    const filterItems: string[] = [];
    for (let filterIndex = 0; filterIndex < randomFilterItems.length; filterIndex++) {
      const valueAttribute = await randomFilterItems[filterIndex].getAttribute('data-filter-variant-name');
      if (valueAttribute) {
        filterItems.push(valueAttribute);
      }
    }

    return filterItems;
  }

  async applyFilter(filterName: string, option: string): Promise<void> {
    const filterBlock = this.filterBlockLoc.filter({ has: this.page.locator(`[data-option-name="${filterName}"]`) });

    // 1. Expand if filter block is hidden
    const display = await filterBlock.locator('.catalog-filter-data').evaluate(el => getComputedStyle(el).display);
    if (display === 'none') {
      const toggleLabel = filterBlock.locator('label');
      await toggleLabel.click();
    }

    // 2. Select option
    const optionLabel = filterBlock.locator(`[data-filter-variant-name="${option}"]`).first();
    await optionLabel.click();
    await waitForPageLoad(this.page);
  }
}
