//ts-nocheck
import * as fs from "fs";

const initLogin = async (ctx) => {
    if (ctx) {
        try {
            await ctx.reply(`
            Введите логин и пароль в формате: 
            login - password
            `);
        } catch (e) {
            console.error(e);
        }
    }
};

const mapMessage = async (ctx) => {
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
};

export { initLogin, mapMessage };
