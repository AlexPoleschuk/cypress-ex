import { setActiveQuestionType, QuestionType } from "../lib/context.js";

const setBaseUrl = async (ctx) => {
    if (ctx) {
        try {
            await setActiveQuestionType(QuestionType.BASE_URL);
            await ctx.reply("Укажите базовый url для тестирования");
        } catch (e) {
            console.error(e);
        }
    }
};

export { setBaseUrl };
