import { setActiveQuestionType, QuestionType } from "../lib/context.js";

const initLogin = async (ctx) => {
    if (ctx) {
        try {
            await setActiveQuestionType(QuestionType.AUTH_DATA);
            await ctx.reply(`
            Введите логин и пароль в формате: 
            login - password
            `);
        } catch (e) {
            console.error(e);
        }
    }
};

export { initLogin };
