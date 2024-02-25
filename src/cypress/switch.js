// @ts-nocheck
import cypress from "cypress";
import config from '../../cypress.config.js';
import { utils } from '../lib/index.js';

const runSwitchProfileTest = async (ctx) => {
    try {
        ctx.reply('Тест переключения профиля');

        const interval = utils.showProcess(ctx);

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

        const chatId = utils.getChatId(ctx);
        const htmlAnswer = utils.getResultsHtml(ctx, results);

        await ctx.telegram.sendMessage(
            chatId,
            htmlAnswer,
            { parse_mode: 'html' },
        );

        await utils.hideProcess(ctx, interval);
    } catch (e) {
        console.error(e);
    }
}

export default runSwitchProfileTest;
