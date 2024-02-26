import createTestRunFn from './testFactory.js';

const runFailAuthTest = async (ctx) => {
    if (ctx) {
        try {
            await createTestRunFn({
                ctx,
                spec: 'cypress/e2e/failAuth.cy.js',
                entity: 'failAuth',
                description: 'Тест ошибки при авторизации',
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export default runFailAuthTest;
