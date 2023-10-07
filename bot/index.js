require('dotenv').config();
const { Agent } = require("node:https");
const { Telegraf } = require('telegraf');

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

bot.start((ctx) =>
    // sets Web App as the menu button for current chat
    ctx.setChatMenuButton({
        text: "Start",
        type: "web_app",
        web_app: { url: app_url },
    })
); 

// Error
bot.catch(error => {
	console.log(error)
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));