const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');

require('dotenv').config();
const { Agent } = require("node:https");
const { Telegraf } = require('telegraf');
const commands = require('./commands');

const token = process.env.TOKEN
const app_url = process.env.MINI_APP_URL

if (!token) throw new Error('"TOKEN" env var is required!');
if (!app_url) throw new Error('"MINI_APP_URL" env var is required!');

// -----  SERVER 
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'POST, GET',
    credentials: true
}))

// TODO: make it work to receive Mini App request and post the message on the chat
app.post('/sendMessage', (req, res) => {
    // try {
        console.log("REQ: ", req)
        console.log("REQ body: ", req.body)

        // const message = 'Hello, bot!';
        // const chatId = req.body.authData.query_id;

        // Send the message to the Telegram Bot using the Telegram Bot API
        // bot.telegram.sendMessage(chatId, message)
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ success: false, message: 'Server error.' });
    // }
});

// Use this line for development
// const bot = new Telegraf(token, { 
//     telegram: { 
//         testEnv: true,
//         agent: new Agent({ keepAlive: false })
//     } 
// });

// And this for production
const bot = new Telegraf(token);

// --- BOT
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

bot.start((ctx) => {
    console.log(">> Start called")
    ctx.reply(start_msg(ctx))
}); 

commands(bot);

bot.catch(error => {
    console.error("Bot caught error:")
	console.log(error)
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  bot.launch();
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));