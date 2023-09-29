require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const start = require('./start');

const token = process.env.TOKEN
const app_url = process.env.MINI_APP_URL
// Use this line for development
const bot = new Telegraf(token, { telegram: { testEnv: true } });
// And this for production

start(bot, app_url)

// bot.on("inline_query", ctx =>
// 	ctx.answerInlineQuery([], {
// 		button: { text: "Launch", web_app: { url: process.env.MINI_APP_URL } },
// 	}),
// );

bot.launch();