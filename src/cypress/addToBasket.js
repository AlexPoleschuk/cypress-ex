// @ts-nocheck
import cypress from "cypress";
import config from '../../cypress.config.js';
import { utils } from '../lib/index.js';

const runAddToBasketTest = async (ctx) => {
    if (ctx) {
        await ctx.reply('Тест добавления в корзину (товар+услуга)');

        const interval = utils.showProcess(ctx);

        try {
            const results = await cypress.run({
                ...config,
                browser: 'chrome',
                spec: 'cypress/e2e/addToBasket.cy.js',
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

            if (results?.totalFailed > 0) {
                await utils.sendMediaFailtureResults(ctx, results, `addToBasket`);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export default runAddToBasketTest;
