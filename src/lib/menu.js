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
                    { text: "Покупка (товар + услуга)", callback_data: "add_to_basket_test" },
                ],
                [
                    { text: "Авторизация c ошибкой", callback_data: "fail_test" },
                ],
                [
                    { text: "Запустить все", callback_data: "all_test" },
                ],
                [
                    { text: "Настройки", callback_data: "options" },
                ],
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

const getOptionsMenu = async (ctx) => {
    await ctx?.reply("Настройки", {
        resize_keyboard: true,
        parse_mode: 'html',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Авторизоваться", callback_data: "authorize" },
                    { text: "Назад", callback_data: "back" },
                ],
            ]
        }
    });
};

export { getMainMenu, getContinuationMenu, getOptionsMenu };
