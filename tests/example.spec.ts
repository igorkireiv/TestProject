import { test, expect } from '@playwright/test';
import {HomePage} from "../src/pages/homePage";

test('has title', async ({ page,homePage,loginPage}) => {
 await homePage.openHomePage();
 await homePage.clickLogInButton();
 await loginPage.fillLogInButton();
 await loginPage.fillPassword();
 await loginPage.clickLogInButton().click();

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

