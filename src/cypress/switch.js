import createTestRunFn from './testFactory.js';

const runSwitchProfileTest = async (ctx) => {
    if (ctx) {
        try {
            await createTestRunFn({
                ctx,
                spec: 'cypress/e2e/switchProfile.cy.js',
                entity: 'switchProfile',
                description: 'Тест переключения профиля',
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export default runSwitchProfileTest;
