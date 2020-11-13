/*  ____              ____        __     __  __           __  _            
   / __ \____ _____  / __ )____  / /_   / / / /___  _____/ /_(_)___  ____ _
  / / / / __ `/ __ \/ __  / __ \/ __/  / /_/ / __ \/ ___/ __/ / __ \/ __ `/
 / /_/ / /_/ / / / / /_/ / /_/ / /_   / __  / /_/ (__  ) /_/ / / / / /_/ / 
/_____/\__,_/_/ /_/_____/\____/\__/  /_/ /_/\____/____/\__/_/_/ /_/\__, /  
Free Hosting for ever!                                            /____/   
*/

//Package Imports
global.Discord = require("discord.js");
global.client = new Discord.Client({ disableEveryone: true });
global.humanizeDuration = require('humanize-duration');
const db = require("quick.db");
global.axios = require("axios");
const fs = require("fs");
global.chalk = require("chalk");

//Import config
global.config = require('./config.json')

//Create database for storing server settings
global.settings = new db.table('settings');

//Event handler
fs.readdir('./events/', (err, files) => {
    files = files.filter(f => f.endsWith('.js'));
    files.forEach(f => {
      const event = require(`./events/${f}`);
      client.on(f.split('.')[0], event.bind(null, client));
      delete require.cache[require.resolve(`./events/${f}`)];
    });
});

//Bot login
client.login(config.DiscordBot.Token);

/*
const axios = require('axios');

const data = {
    "user": "137624084572798976"
}
    axios({
        url: "http://danbot.host/external/fetch",
        method: 'GET',
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            "password": config.Misc.externalPassword
        },
        data: data
    }).then(response => {
        console.log(response.data.all)
    }).catch(error => {
        message.channel.send("Error: DanBot Hosting bot is offline. Please try again later!")
    });

*/