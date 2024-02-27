// @ts-nocheck
import { Telegraf } from 'telegraf';
import config from 'config';

import {
    runAddToBasketTest,
    runAllTests,
    runAuthTest,
    runSwitchProfileTest,
    runFailAuthTest,
} from './cypress/index.js'

import { menu, smalltalk } from './lib/index.js';
import { sleep } from './lib/utils.js';

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
bot.action('fail_test', runFailAuthTest);

bot.action('next_test', smalltalk.getNext);
bot.action('end', smalltalk.getBye);

bot.botInfo = await bot.telegram.getMe();
console.log("Bot started");
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
