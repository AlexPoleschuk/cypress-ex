// @ts-nocheck
import cypress from "cypress";
import config from '../../cypress.config.js';
import { utils } from '../lib/index.js';

const runAllTests = async (ctx) => {
    if (ctx) {
        await ctx.reply('Запуск всех тестов');

        const interval = utils.showProcess(ctx);

        try {
            const results = await cypress.run({
                ...config,
                spec: 'cypress/e2e/*.cy.js',
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

            if (results?.totalFailed > 0) {
                await utils.sendMediaFailtureResults(ctx, results, `all`);
            }

            await utils.hideProcess(ctx, interval);
        } catch (e) {
            console.error(e);
        }
    }
}

export default runAllTests;
