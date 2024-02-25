const getMainMenu = async (ctx) => {
    await ctx?.reply("Доступные тесты", {
        resize_keyboard: true,
        parse_mode: 'html',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Авторизация", callback_data: "auth_test" },
                    { text: "Переключение профиля", callback_data: "switch_test" },
                ],
                [
                    { text: "Запустить все", callback_data: "all_test" },
                ]
            ]
        }
    });
};

const getContinuationMenu = async (ctx) => {
    await ctx?.reply("Продолжим?", {
        resize_keyboard: true,
        parse_mode: 'html',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Следующий тест!", callback_data: "next_test" },
                    { text: "Всё, довольно!", callback_data: "end" },
                ],
            ]
        }
    });
};

export { getMainMenu, getContinuationMenu };
