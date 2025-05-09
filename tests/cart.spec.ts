import { test, expect } from '@fixtures/fixturePages';

test.describe('Cart e2e flow', () => {
    const categories = ['Парфумерія', 'Макіяж', 'Догляд за шкірою'];
    const addedProducts: {
        title: string;
        price: number;
        quantity: number;
    }[] = [];

    test('Add & remove items in cart test', async ({ homePage }) => {
        await homePage.logIn();
        await homePage.headerMenu.cartIcon.clickButton();
        await homePage.headerMenu.cartPopup.clearCart();

        for (const category of categories) {
            await homePage.openCategoryByName(category);

            const title = await homePage.getFirstProductTitle();
            const price = await homePage.getFirstProductPrice();

            addedProducts.push({ title, price, quantity: 1 });

            await homePage.addFirstProductToCart();
        }

        await cartPage.open();

        const cartItems = await cartPage.getAllCartItems();

        // Перевірка кількості
        await expect.soft(cartItems.length).toBe(addedProducts.length);

        // Перевірка кожного товару
        for (const expected of addedProducts) {
            const actual = cartItems.find(item => item.title === expected.title);
            expect.soft(actual).toBeTruthy();
            expect.soft(actual?.price).toBe(expected.price);
            expect.soft(actual?.quantity).toBe(expected.quantity);
            expect.soft(actual?.total).toBe(expected.price * expected.quantity);
        }

        // Перевірка загальної суми
        const expectedTotal = addedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
        const actualTotal = await cartPage.getCartTotalPrice();
        await expect.soft(actualTotal).toBe(expectedTotal);
    });
});
