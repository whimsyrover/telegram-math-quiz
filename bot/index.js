require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const start = require('./features/start');

const token = process.env.TOKEN
const app_url = process.env.MINI_APP_URL
// Use this line for development
const bot = new Telegraf(token, { telegram: { testEnv: true } });

// And this for production
// const bot = new Telegraf(token);

start(bot, app_url)

bot.launch();