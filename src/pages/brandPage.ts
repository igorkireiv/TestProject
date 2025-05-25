import { BasePage } from '@pages/basePage';
import { Locator, Page } from '@playwright/test';

export class BrandPage extends BasePage {
  private readonly pageTitleLoc: Locator;
  private readonly alphabetLoc: Locator;
  private readonly brandsSearchResultsLoc: Locator;
  private readonly selectedLetterLoc: Locator;
  private readonly brandsItemLoc: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleLoc = this.page.locator('h1.page-header');
    this.alphabetLoc = this.page.locator('.brands-alphabet');
    this.brandsSearchResultsLoc = this.page.locator('.brands__content-wrap .brands__column.active');
    this.selectedLetterLoc = this.brandsSearchResultsLoc.locator('.brands__letter');
    this.brandsItemLoc = this.brandsSearchResultsLoc.locator('.brands__item');
  }

  get pageTitle(): Locator {
    return this.pageTitleLoc;
  }

  get selectedLetter(): Locator {
    return this.selectedLetterLoc;
  }

  async searchByLetter(letter: string): Promise<void> {
    await this.alphabetLoc.getByText(letter, { exact: true }).click();
  }

  async selectBrandFromSearchResults(brand: string): Promise<void> {
    await this.brandsItemLoc.getByText(brand, { exact: true }).click();
  }

  async getAllBrandItems(): Promise<string[]> {
    return this.brandsItemLoc.allInnerTexts();
  }
}
