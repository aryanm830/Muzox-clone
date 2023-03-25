const discord = require("discord.js");
const { EmbedBuilder, WebhookClient,  GatewayIntentBits } = require('discord.js')
const { Webhooks: {bot_error} } = require('./config.json')
const { Poru ,options} = require("poru");
const osUtils = require("os-utils"); 
const Topgg =require('@top-gg/sdk')
const Client = discord.Client;
const chalk = require("chalk");
const moment = require("moment");
const botconfig = require('./config.json');
const ms = require("ms");
const mongoose = require("mongoose");
require("dotenv").config()

const client = new Client({
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  
    failIfNotExists: true,
    allowedMentions: {
      parse: ['roles', 'users', 'everyone'],
      repliedUser: false,
    },
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildBans,

    ],
});
const { Database } = require("quickmongo");

client.login(process.env.TOKEN).catch(e => console.log(e));

client.config = require("./config.json");
client.poru = new Poru(client, client.config.nodes,{
  reconnectTime: 30,
  resumeKey: "muzox",
  resumeTimeout: 60,
  defaultPlatform: "ytsearch",
  spotify: {
    playlistLimit: 10000,
  }
    
});
client.commands = new discord.Collection();
client.config = require('./config.json');
client.emoji = require('./util/emoji.json');
client.prefix = client.config.prefix;
client.topgg = new Topgg.Api(client.config.topgg)
client.aliases = new discord.Collection();
client.slash = new discord.Collection();

client.userSettings = new discord.Collection();
client.logger = require('./util/logger.js') 
client.db = new Database(botconfig.db);
const dbOptions ={
  useNewUrlParser:true,
  autoIndex:false,
  useUnifiedTopology:true
}

mongoose.connect(botconfig.db,dbOptions)
mongoose.connection.on("connected",()=>{
 client.logger.log("mongoose connected")

})
client.on('interactionCreate', async interaction => {
    if(interaction.isButton())
  {
    
    if(interaction.customId === 'DELETE_BUT')
    {
    const em = new EmbedBuilder()
    .setDescription(`Only Bot Owner Can Use This Button`)
    .setColor(`#ff0000`)

    if(client.config.owner.includes(interaction.member.user.id))
    return interaction.message.delete();
    else
    return interaction.reply({embeds: [em], ephemeral: true});
    }
  
  }
  });
  const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
  const web = new WebhookClient({ url: bot_error }); 

process.on('unhandledRejection', (error) => {
  console.log(error)
//console.log(`[${chalk.gray(date)}]: [${chalk.black.bgRed('ERROR')}] ${error}`)
});
//now creating interaction event
["commands","events","PoruEvent"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
//wev server
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});