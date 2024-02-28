import createTestRunFn from "./testFactory.js";

const runAuthTest = async (ctx) => {
    if (ctx) {
        try {
            await createTestRunFn({
                ctx,
                spec: "cypress/e2e/auth.cy.js",
                entity: "auth",
                description: "Тест авторизации",
            });
        } catch (e) {
            console.error(e);
        }
    }
};

export default runAuthTest;
