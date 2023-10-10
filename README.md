# Squizme
Squeeze your brain with some math quizzes 

## TL;DR;
To locally setup a Mini App on Telegram you will need:
1. A **web server** running on your machine
2. A **localhost exposer** to allow Telegram access your localhost
3. A **Telegram bot** running on your machine

`BotFather` useful commands:
- `/help`
- `/editapp`
- `/setmenubutton`: sets the button on the chat. This feature allows access to **more features**, such as basic user information (as I use here the name).

> This is Mini Apps is lauched from the Menu Button (bot menu button)
![Alt text](documentation/img/implementing_mini_app.jpeg)

# Create a Telegram test env
## Install the Telegram Beta Version (macOS)
1. Download and launch the Beta Version of Telegram macOS.
2. Quickly click 5 times on the Settings icon to open the debug menu and enable “Debug Mini Apps”.
Reference: https://core.telegram.org/bots/webapps#debug-mode-for-mini-apps

## Create a Test Account
A **test account** allows access to the test envirorment of Telegram. It is completely separate from the main environment where you have you real account. You will need to create a new user account:
```
- iOS: tap 10 times on the Settings icon > Accounts > Login to another account > Test.
- Telegram Desktop: open ☰ Settings > Shift + Alt + Right click ‘Add Account’ and select ‘Test Server’.
- macOS: click the Settings icon 10 times to open the Debug Menu, ⌘ + click ‘Add Account’ and log in via phone number.
```
Reference: https://core.telegram.org/bots/webapps#using-bots-in-the-test-environment

# Create a Telegram Bot (backend)
Talk to `BotFather`, type `/help`, and follow the instructions to create a new bot.  
Check the [documentation](https://core.telegram.org/bots#how-do-i-create-a-bot)

Use the `/setcommands` and type: `curiosity - Get a random curiosity about math`. You must tell the BotFather what commands are available. These commandas responses are handled in `/bot/commands.js`.

To run it:
```
cd bot
node index.js
```

> Note: it runs by default in port 4000. It cannot be the same port as the Mini App.

You may face several `FetchError: request to https://api.telegram.org/<token>/getMe failed, reason: Socket connection timeout` for test and production, but keep trying and eventually it will work.

# Create a Telegram Mini App (frontend)
Talk to `BotFather`, type `/help`, and follow the instructions to create a new Mini App (Web App).
A list of commands will appear. Follow the instructions of `/newapp` to create a new app.

`BotFather` will ask you: `Now please send me the Web App URL that will be opened when users follow a web app direct link.`  

This URL must be a valid URL exposed on the internet. But you will start developing on your localhost, how to setup that?

# Setup this Mini App locally
The following steps will allow that you run this Mini App on your local server (localhost), and at the same time accessing it on the Telegram App (test environment)

### 1. Clone the repo
```
git clone git@github.com:MaisaMilena/telegram-math-quiz.git
```

### 2. Create a web server (open a new terminal - this will keep running): 
```
cd telegram-math-quiz/MiniApp
npm start
```
This will setup the project, start the web server and open the web application in your browser on `http://localhost:3000/`  

### 3. Expose your localhost (open a new terminal - this will keep running)
I suggest using [ngrok](https://ngrok.com/docs/getting-started/) to allow your localhost be accessible on the internet, a requirement to run Mini Apps locally.  
3.1 download ngrok  
3.2 connect your ngrok account  
3.3 then run:
```
ngrok http 3000
```
<img width=800 src="documentation/img/ngrok-running.png">

### 4. Tell `BotFather` the ngrok URL to finish the Mini App creation
> Pay attention that every time you run the ngrok it will be a different URL and you will need to run `/editApp` and `/setmenubutton` to edit it.

# Cool projects:
- [TheCymond - Telegram Web App](https://github.com/TheCymond/Telegram_Web_App)
- Example of [Mini App](https://github.com/revenkroz/telegram-web-app-bot-example) on a single HTML file