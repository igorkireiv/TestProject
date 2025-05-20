import { Page } from '@playwright/test';

export function getRandomItems<T>(items: T[], count: number): T[] {
  if (count >= items.length) {
    return [...items]; // if expected count is bigger than total items count - return all items
  }

  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function parsePrice(priceStr: string): number {
  return Number(priceStr.replace(/\D/g, ''));
}

export function normalizeText(text: string): string {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function waitForPageLoad(page: Page, timeout = 10000) {
  await page.locator('.catalog-bottom-row + .loading-block').waitFor({ state: 'hidden', timeout: timeout });
  await page.waitForLoadState('domcontentloaded', { timeout });
  await page.waitForLoadState('load', { timeout });
}
