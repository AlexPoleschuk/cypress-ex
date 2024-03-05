//ts-nocheck

import { setActiveQuestionType, QuestionType } from "../lib/context.ts";

const setBaseUrl = async (ctx) => {
    if (ctx) {
        try {
            await setActiveQuestionType(QuestionType.BASE_URL);
            console.log(ctx.update.callback_query.from);
            await ctx.reply("Укажите базовый url для тестирования");
        } catch (e) {
            console.error(e);
        }
    }
};

export { setBaseUrl };
