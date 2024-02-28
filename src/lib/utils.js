import { getDirFiles, walkDir } from "../reporter/lib/index.js";

const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const getChatId = (ctx) => {
    if (ctx) {
        return ctx.update.callback_query.message.chat.id;
    }

    return "";
};

const getChatMessageId = (ctx) => {
    if (ctx) {
        return ctx.update.callback_query.message.message_id;
    }

    return "";
};

const getMessageDate = (ctx) => {
    if (ctx) {
        return new Date(Number(ctx.update.callback_query.message.date) * 1000);
    }

    return new Date();
};

const rmPrevMessage = async (ctx) => {
    const chatId = getChatId(ctx);
    const messageId = getChatMessageId(ctx);

    try {
        await ctx.telegram.deleteMessage(chatId, messageId);
    } catch (e) {
        console.error(e);
    }
};

const getResultsHtml = (ctx, results) => {
    const isAnyoneFailed = results.totalFailed > 0;
    const headerEmj = isAnyoneFailed ? `💊` : `🍀`;

    return `
    <u>${headerEmj}<strong>Results</strong>${headerEmj}</u>
    ----------------------------
    <b>Total:</b> ${results.totalTests}
    <b>Passed:</b> ${results.totalPassed}
    <b>Failed:</b> ${results.totalFailed}
    ----------------------------
    <i>🏁${isAnyoneFailed ? `Некоторые тесты завершились неудачно` : `Все тесты успешно пройдены.`}🏁</i>
    `;
};

const getPhotoResults = async (testEntity) => {
    let screenshots = [];

    if (testEntity === "all") {
        screenshots = await walkDir("cypress/screenshots");
    } else {
        screenshots = getDirFiles(`cypress/screenshots/${testEntity}.cy.js`);
    }

    if (screenshots.length > 0) {
        return screenshots.map((item) => ({
            type: "photo",
            media: {
                source:
                    testEntity === "all"
                        ? item
                        : `cypress/screenshots/${testEntity}.cy.js/${item}`,
            },
        }));
    }

    return [];
};

const getVideoResults = () => {
    const videos = getDirFiles(`cypress/videos`);

    if (videos.length > 0) {
        return videos.map((item) => ({
            type: "video",
            media: {
                source: `cypress/videos/${item}`,
                filename: `${item}_test_failture.mp4`,
            },
        }));
    }

    return [];
};

const sendMediaFailtureResults = async (ctx, results, testEntity) => {
    if (results?.totalFailed > 0) {
        const screenList = await getPhotoResults(testEntity);
        const videosList = testEntity === "all" ? [] : getVideoResults();

        await ctx.replyWithMediaGroup([...screenList, ...videosList]);
    }
};
export {
    getChatId,
    getChatMessageId,
    getMessageDate,
    getResultsHtml,
    rmPrevMessage,
    sendMediaFailtureResults,
    sleep,
};
