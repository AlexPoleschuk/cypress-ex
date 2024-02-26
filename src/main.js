// @ts-nocheck
import { Telegraf } from 'telegraf';
import config from 'config';

import {
    runAddToBasketTest,
    runAllTests,
    runAuthTest,
    runSwitchProfileTest,
} from './cypress/index.js'

import { menu } from './lib/index.js';
import { sleep } from './lib/utils.js';

const sleepStub = () => sleep(500);

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
    handlerTimeout: Infinity,
});

bot.command('start', async (ctx) => {
    await ctx.reply('Привет!');
});

bot.command('menu', menu.getMainMenu);

bot.command('help', (ctx) => {
    ctx.reply('use /menu command');
});

bot.action('all_test', runAllTests);
bot.action('auth_test', runAuthTest);
bot.action('switch_test', runSwitchProfileTest);
bot.action('add_to_basket_test', runAddToBasketTest);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
