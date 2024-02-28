import createTestRunFn from "./testFactory.js";

const runAddToBasketTest = async (ctx) => {
    if (ctx) {
        try {
            await createTestRunFn({
                ctx,
                spec: "cypress/e2e/addToBasket.cy.js",
                entity: "addToBasket",
                description: "Тест добавления в корзину (товар+услуга)",
            });
        } catch (e) {
            console.error(e);
        }
    }
};

export default runAddToBasketTest;
