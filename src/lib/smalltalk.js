import { rmPrevMessage } from "./utils.js";
import { getMainMenu } from './menu.js'

const getSalute = async (ctx) => {
    if (ctx) {
        try {
            await ctx.reply(`Привет!`);
        }
        catch (e) {
            console.error(e);
        }
    }
}

const getHelp = async (ctx) => {
    if (ctx) {
        try {
            await ctx.reply(`
                - Чтобы начать тестирование, выбери нужное в /menu. \n - Тест выполняется: 🔥🔥🔥🚀. \n - По окончании работы будут выведены результаты 💊/🍀.
            `);
        }
        catch (e) {
            console.error(e);
        }
    }
}

const getNext = async (ctx) => {
    if (ctx) {
        try {
            await rmPrevMessage(ctx);
            await getMainMenu(ctx);
        }
        catch (e) {
            console.error(e);
        }
    }
}

const getBye = async (ctx) => {
    if (ctx) {
        try {
            await rmPrevMessage(ctx);
            await ctx.reply(`Что ж, пока-пока!`);
        }
        catch (e) {
            console.error(e);
        }
    }
}

export { getBye, getHelp, getNext, getSalute };
