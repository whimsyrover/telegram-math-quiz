const get_name = (ctx) => {
    try {
      return ctx.update.message.from.first_name;
    } catch(e){
      return "friend";
    }
  }
  
const start_msg = (ctx) => `
Hello, ${get_name(ctx)}.
`

module.exports = (bot, mini_app_url) => {
    bot.start((ctx) => 
      ctx.reply(
          start_msg(ctx),
          Markup.keyboard([Markup.button.webApp("Launch", mini_app_url)]).resize(),
        ),
    );
    // bot.command("start", ctx =>
    //   ctx.reply(
    //     start_msg(ctx),
    //     Markup.keyboard([Markup.button.webApp("Launch", process.env.MINI_APP_URL)]).resize(),
    //   ),
    // );
}