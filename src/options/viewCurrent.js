import authData from "../../cypress/fixtures/auth.json" with { type: "json" };
import baseUrlData from "../../cypress/fixtures/baseUrl.json" with { type: "json" };

import { getChatId } from "../lib/utils.js";

function getPropertyValue(value) {
    if (value) {
        return value;
    }

    return "не установлен";
}

const viewCurrent = async (ctx) => {
    if (ctx) {
        try {
            const chatId = getChatId(ctx);

            const htmlAnswer = `<strong> Текущие настройки </strong>
----------------------------
<b>Login:</b> <i>${getPropertyValue(authData.username)}</i>
<b>Password:</b> <i>${getPropertyValue(authData.password)}</i>
<b>Base Url:</b> <i>${getPropertyValue(baseUrlData.url)}</i>
----------------------------
<b>You can set anower by manage Options</b>
`;

            await ctx.telegram.sendMessage(chatId, htmlAnswer, {
                parse_mode: "html",
            });
        } catch (e) {
            console.error(e);
        }
    }
};

export { viewCurrent };
