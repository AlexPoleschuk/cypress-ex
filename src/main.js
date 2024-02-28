// @ts-nocheck
import "dotenv/config.js";
import { Telegraf } from 'telegraf';
import config from 'config';
import { message } from 'telegraf/filters';

import {
    runAddToBasketTest,
    runAllTests,
    runAuthTest,
    runSwitchProfileTest,
} from './cypress/index.js'

import { menu, smalltalk } from './lib/index.js';
import { sleep } from './lib/utils.js';
import { initLogin, mapMessage } from './options/login.js'

const sleepStub = () => sleep(500);

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
    handlerTimeout: Infinity,
});

bot.command('start', smalltalk.getSalute);
bot.command('menu', menu.getMainMenu);
bot.command('help', smalltalk.getHelp);

bot.action('all_test', runAllTests);
bot.action('auth_test', runAuthTest);
bot.action('switch_test', runSwitchProfileTest);
bot.action('add_to_basket_test', runAddToBasketTest);

bot.action('options', menu.getOptionsMenu);
bot.action('authorize', initLogin);

bot.action('next_test', smalltalk.getNext);
bot.action('back', menu.getMainMenu);
bot.action('end', smalltalk.getBye);

bot.on(message('text'), mapMessage);

bot.botInfo = await bot.telegram.getMe();
console.log("Bot started");
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
