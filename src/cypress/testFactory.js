// @ts-nocheck
import cypress from "cypress";
import config from "../../cypress.config.js";
import { menu, progressBars, utils } from "../lib/index.js";

const createTestRunFn = async ({
    ctx,
    spec,
    entity,
    description,
}) => {
    if (ctx) {
        await ctx.reply(description);

        const interval = progressBars.showLineProcess(ctx);

        try {
            const results = await cypress.run({
                ...config,
                browser: 'chrome',
                spec,
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
                await utils.sendMediaFailtureResults(ctx, results, entity);
            }

            await progressBars.hideProcess(ctx, interval);

            await menu.getContinuationMenu(ctx);
        } catch (e) {
            console.error(e);
        }
    }
}

export default createTestRunFn;
