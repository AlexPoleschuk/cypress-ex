// @ts-nocheck
import cypress from "cypress";
import config from '../../cypress.config.js';
import { getResultsMarkdown } from '../lib/index.js';

const runSwitchProfileTest = async (ctx) => {
    try {
        ctx.reply('В процессе: Тест переключения профиля...');

        const results = await cypress.run({
            ...config,
            spec: 'cypress/e2e/switchProfile.cy.js',
        }).then(results => {
            if (results?.status === 'failed') {
                return null;
            } else {
                return results;
            }
        }).catch((e) => {
            console.error(e);
        });

        const formattedAnswer = getResultsMarkdown(results);

        ctx.reply(formattedAnswer);

        setTimeout(() => {
            ctx.reply(menu.getContinuationMenu());
        }, 1000);
    } catch (e) {
        console.error(e);
    }
}

export default runSwitchProfileTest;
