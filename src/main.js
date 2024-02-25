import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import config from 'config';

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
    handlerTimeout: Infinity,
});

bot.command('start', (ctx) => {
    ctx.reply('Hi bro! Send ur command');
});

bot.on(message('text'), (ctx) => {
    ctx.reply('?');
});

bot.launch();
