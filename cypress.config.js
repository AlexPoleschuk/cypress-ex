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
            "*.clarity.ms",
            "ctl-api.exponea.com",
            "vk.com",
            "getrcmx.com",
            "monitoring-front-agent.svc.citilink.lt",
        ],
        setupNodeEvents(on, config) {
            config.env = {
                telegram: {
                    includeStats: true,
                    finalReport: 'merged-report.json'
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
        on("after:spec", (spec, results) => {
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
});
