require('dotenv').config();
const { Agent } = require("node:https");
const { Telegraf } = require('telegraf');
const commands = require('./commands');

const token = process.env.TOKEN
const app_url = process.env.MINI_APP_URL

if (!token) throw new Error('"TOKEN" env var is required!');
if (!app_url) throw new Error('"MINI_APP_URL" env var is required!');

// Use this line for development
// const bot = new Telegraf(token, { 
//     telegram: { 
//         testEnv: true,
//         agent: new Agent({ keepAlive: false })
//     } 
// });

// And this for production
const bot = new Telegraf(token);

// --- Start
const get_name = (ctx) => {
    try {
      return ctx.update.message.from.first_name;
    } catch(e){
      return "friend";
    }
  }
  
const start_msg = (ctx) => `
Hello, ${get_name(ctx)}. Ready to practice your math skills? 📝
`

// bot.on("inline_query", ctx =>
// 	ctx.answerInlineQuery([], {
// 		button: { text: "Launch", web_app: { url: app_url } },
// 	}),
// );

bot.start((ctx) => {
    console.log(">> Start called")
    ctx.reply(start_msg(ctx))
}); 

commands(bot);

bot.answerWebAppQuery((web_app_query_id, result) => {
    console.log("🦋 result: ", result)
})


bot.catch(error => {
	console.log(error)
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));