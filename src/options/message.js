import * as fs from "fs";

import { getCustomContext, QuestionType } from "../lib/context.js";

async function mapAnswerByType(questionType, ctx) {
    switch (questionType) {
        case QuestionType.AUTH_DATA:
            await mapAuthDataAnswer(ctx);
            break;
        case QuestionType.BASE_URL:
            await mapBaseUrlAnswer(ctx);
            break;
        default:
            break;
    }
}

function mapAuthDataAnswer(ctx) {
    if (ctx) {
        try {
            const msgText = ctx.update.message.text;
            const authArr = msgText.split(" - ");
            const enteredLogin = authArr[0].trim();
            const enteredPassword = authArr[1].trim();

            fs.readFile(
                "cypress/fixtures/auth.json",
                "utf8",
                function (err, data) {
                    let json = JSON.parse(data);
                    json["username"] = enteredLogin;
                    json["password"] = enteredPassword;
                    fs.writeFile(
                        "cypress/fixtures/auth.json",
                        JSON.stringify(json),
                        function (err) {
                            if (err) throw err;
                            console.log(
                                'The "data to append" was appended to file!',
                            );
                        },
                    );
                },
            );
        } catch (e) {
            console.error(e);
        }
    }
}

async function mapBaseUrlAnswer(ctx) {
    if (ctx) {
        try {
            const msgText = ctx.update.message.text;

            fs.readFile(
                "cypress/fixtures/baseUrl.json",
                "utf8",
                function (err, data) {
                    let json = JSON.parse(data);
                    json["url"] = msgText;

                    fs.writeFile(
                        "cypress/fixtures/baseUrl.json",
                        JSON.stringify(json),
                        function (err) {
                            if (err) throw err;
                            console.log(
                                'The "data to append" was appended to file!',
                            );
                        },
                    );
                },
            );
        } catch (e) {
            console.error(e);
        }
    }
}

async function mapMessage(ctx) {
    const customContext = getCustomContext();

    await mapAnswerByType(customContext.activeQuestion, ctx);
}

export { mapMessage };
