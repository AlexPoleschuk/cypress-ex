import { getChatId, getChatMessageId, rmPrevMessage } from "./utils.js";

const DEFAULT_TIMEOUT = 500;

const showRocketProcess = (ctx, timeout = DEFAULT_TIMEOUT) => {
    let i = 0;
    const emj = `🔥`;
    const chatId = getChatId(ctx);
    const messageId = getChatMessageId(ctx);

    return setInterval(async () => {
        i = i < 15 ? i + 1 : 1;

        try {
            if (messageId) {
                await ctx.telegram.editMessageText(
                    chatId,
                    messageId,
                    null,
                    `🔥🔥${emj.repeat(i)}🚀`,
                );
            }
        } catch (e) {
            console.error(e);
        }
    }, timeout);
};

const showLineProcess = (ctx, timeout = DEFAULT_TIMEOUT) => {
    let i = 0;
    const lineWidth = 10;
    const doneIcon = `🟩`;
    const pendingIcon = `⬜️`;
    const chatId = getChatId(ctx);
    const messageId = getChatMessageId(ctx);

    return setInterval(async () => {
        i = i < lineWidth ? i + 1 : 0;

        try {
            if (messageId) {
                await ctx.telegram.editMessageText(
                    chatId,
                    messageId,
                    null,
                    `${doneIcon}`.repeat(i) +
                        `${pendingIcon}`.repeat(lineWidth - i),
                );
            }
        } catch (e) {
            console.error(e);
        }
    }, timeout);
};

const hideProcess = async (ctx, interval) => {
    clearInterval(interval);

    try {
        await rmPrevMessage(ctx);
    } catch (e) {
        console.error(e);
    }
};

export { showLineProcess, showRocketProcess, hideProcess };
