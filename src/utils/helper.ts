import { Page } from '@playwright/test';

export function parsePrice(priceStr: string): number {
  return Number(priceStr.replace(/\D/g, ''));
}

export async function waitForPageLoad(page: Page, timeout = 10000, interval = 200) {
  const start = Date.now();

  while (true) {
    const allHidden = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('.loading-block'));
      return elements.every(el => {
        const style = window.getComputedStyle(el);
        return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
      });
    });

    if (allHidden) {
      await page.waitForLoadState('networkidle', { timeout });
      await page.waitForLoadState('load', { timeout });
      await page.waitForLoadState('domcontentloaded', { timeout });
      break;
    }

    if (Date.now() - start > timeout) {
      throw new Error('Page is not load after timeout');
    }

    await page.waitForTimeout(interval);
  }
}
