import getDirFiles from "../reporter/lib/getDirFiles.js";

const sleep = (ms) => (
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
);

const getChatId = (ctx) => {
    if (ctx) {
        return ctx.update.callback_query.message.chat.id;
    }

    return '';
};

const getChatMessageId = (ctx) => {
    if (ctx) {
        return ctx.update.callback_query.message.message_id;
    }

    return '';
};

const getMessageDate = (ctx) => {
    if (ctx) {
        return new Date(Number(ctx.update.callback_query.message.date) * 1000);
    }

    return new Date();
}

const showProcess = (ctx) => {
    let i = 0;
    const emj = `🔥`;
    const chatId = getChatId(ctx);
    const messageId = getChatMessageId(ctx);

    return setInterval(async () => {
        i = i < 15 ? i + 1 : 1;

        await ctx.telegram.editMessageText(
            chatId,
            messageId,
            null,
            `🔥🔥${emj.repeat(i)}🚀`,
        );
    }, 500);
};

const hideProcess = async (ctx, interval) => {
    clearInterval(interval);

    const chatId = getChatId(ctx);
    const messageId = getChatMessageId(ctx);

    await ctx.telegram.deleteMessage(chatId, messageId);
}

const getResultsHtml = (ctx, results) => {
    const isAnyoneFailed = results.totalFailed > 0;
    const headerEmj = isAnyoneFailed ? `💊` : `🍀`;

    return (`
    <u>${headerEmj}<strong>Results</strong>${headerEmj}</u>
    ----------------------------
    <b>Total:</b> ${results.totalTests}
    <b>Passed:</b> ${results.totalPassed}
    <b>Failed:</b> ${results.totalFailed}
    ----------------------------
    <i>🏁${isAnyoneFailed ? `Некоторые тесты завершились неудачно` : `Все тесты успешно пройдены.`}🏁</i>
    `);
};

const sendMediaFailtureResults = async (ctx, results, testEntity) => {
    if (results?.totalFailed > 0) {
        const screenshots = getDirFiles(`cypress/screenshots/${testEntity}.cy.js`);
        const videos = getDirFiles(`cypress/videos`);

        const screenList = screenshots.map((item) => ({
            type: 'photo',
            media: {
                source: `cypress/screenshots/${testEntity}.cy.js/${item}`,
            }
        }));

        const videosList = videos.map((item) => ({
            type: 'video',
            media: {
                source: `cypress/videos/${item}`,
                filename: `${item}_test_failture.mp4`,
            }
        }));

        await ctx.replyWithMediaGroup([
            ...screenList,
            ...videosList
        ]);
    }
}
export {
    getChatId,
    getResultsHtml,
    getChatMessageId,
    getMessageDate,
    showProcess,
    hideProcess,
    sleep,
    sendMediaFailtureResults,
};
