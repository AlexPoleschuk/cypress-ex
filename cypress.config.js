const { defineConfig } = require("cypress");
const fs = require("fs");

const telegramReporter = require("cypress-telegram-reporter");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://www.citilink.stage.citilink.lt/",
        defaultCommandTimeout: 10000,
        blockHosts: [
            "*.datago.ru",
            "mc.yandex.ru",
            "www.google-analytics.com",
            "*.google-analytics.com",
            "*google-analytics.com",
            "ev.adriver.ru",
            "fga.citilink.ru",
            "ctl-api.exponea.com",
            "vk.com",
            "getrcmx.com",
            "monitoring-front-agent.svc.citilink.lt",
        ],
        setupNodeEvents(on, config) {
            config.env = {
                BOT_TOKEN: "6809103143:AAHTNtGcs5UBOqkGZLWdtMJ60WCi6rLpXeU",
                CHAT_ID: "277383731",
                telegram: {
                    botToken: "6809103143:AAHTNtGcs5UBOqkGZLWdtMJ60WCi6rLpXeU",
                    chatId: "277383731",
                    includeStats: false,
                    finalReport : 'merged-report.json'
                },
            }
            telegramReporter(on, config);
        },
    },
    video: true,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
        configFile: "reporter-telegram.json",
    },
    setupNodeEvents(on, config) {
        // on("before:run", (on,config) => {
        //   console.log(on,config);
        // })
        // console.log(on,config);
        // telegramReporter(on, config);
        // on("after:run", ()=>{
        //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //   fetch(`https://api.telegram.org/bot%5B${telegram.botToken}%5D/sendMessage?chat_id=%5B${telegram.chatId}%5D&text=%5BMY_MESSAGE_TEXT%5D`)
        // })
        on("after:spec", (spec, results) => {
            // console.log(spec, results , "<<<<<<<<<<<<<<<<<");
            if (results && results.video) {
                const failures = results.tests.some((test) =>
                    test.attempts.some((attempt) => attempt.state === "failed")
                );
                if (!failures) {
                    fs.unlinkSync(results.video);
                }
            }
        });
    },
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    // reporter: 'cypress-telegram-reporter',
});
