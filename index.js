const discord = require("discord.js");
const { EmbedBuilder, WebhookClient,  GatewayIntentBits } = require('discord.js')
const { Webhooks: {bot_error} } = require('./config.json')
const { Poru ,options} = require("poru");
const osUtils = require("os-utils"); 
const Client = discord.Client;
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
  defaultPlatform: "scsearch"
    
});
client.commands = new discord.Collection();
client.config = require('./config.json');
client.emoji = require('./utils/emoji.json');
client.prefix = client.config.prefix;
client.aliases = new discord.Collection();
client.slash = new discord.Collection();
client.userSettings = new discord.Collection();
client.logger = require('./utils/logger.js') 
client.db = new Database("mongodb+srv://Disc:World@cluster0.gvess.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const dbOptions ={
  useNewUrlParser:true,
  autoIndex:false,
  useUnifiedTopology:true
}

mongoose.connect("mongodb+srv://Disc:World@cluster0.gvess.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",dbOptions)
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
const web = new WebhookClient({ url: bot_error }); 

process.on('unhandledRejection', (error) => {
client.logger.error(error)
});
//now creating interaction event
["commands","events","PoruEvent"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});




