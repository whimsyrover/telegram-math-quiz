const { Markup } = require('telegraf');

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

module.exports = (bot, mini_app_url) => {
    bot.start((ctx) => 
      ctx.reply(
          start_msg(ctx),
          Markup.keyboard([Markup.button.webApp("I'm ready", mini_app_url)]).resize(),
        ),
    );
}