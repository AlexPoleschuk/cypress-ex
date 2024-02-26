import createTestRunFn from './testFactory.js';

const runAllTests = async (ctx) => {
    if (ctx) {
        try {
            await createTestRunFn({
                ctx,
                spec: 'cypress/e2e/*.cy.js',
                entity: 'all',
                description: 'Запуск всех тестов',
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export default runAllTests;
