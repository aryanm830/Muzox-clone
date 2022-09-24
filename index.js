const discord = require("discord.js");
const { MessageEmbed, WebhookClient, Options, LimitedCollection } = require('discord.js')
const { Webhooks: {bot_error} } = require('./config.json')
const { Poru ,options} = require("poru");
const osUtils = require("os-utils"); 
const Client = discord.Client;
const ms = require("ms");
const mongoose = require("mongoose");
require("dotenv").config()

const client = new Client({
  messageCacheLifetime: 0,
  fetchAllMembers: false,
  messageCacheMaxSize: 0,
  restTimeOffset: 0,
    
makeCache: Options.cacheWithLimits({

...Options.defaultMakeCacheSettings,

MessageManager: {
sweepInterval: 300,
sweepFilter: LimitedCollection. filterByLifetime({
Lifetime: 1800,
getComparisonTimestamp: e => e.editedTimestamp ?? e.createdTimestamp,
})
    }
                                                 }),
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS","GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});
const { Database } = require("quickmongo");

client.login(process.env.TOKEN).catch(e => console.log(e));


client.config = require("./botconfig/config.json");
client.poru = new Poru(client, client.config.nodes,{
  reconnectTime: 600,
  resumeKey: "muzox",
  resumeTimeout: 600000,
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
    const em = new MessageEmbed()
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
console.log(error);
    const embed = new MessageEmbed()
    .setColor(client.config.embedColor)
    .setAuthor(`UnhandledRejection Error`)
    .setDescription(`Error Caught by ${client.user.username}\n\`\`\`js\n${error}\`\`\``)
  web.send({embeds: [embed]})
});
//now creating interaction event
["commands","events","slash","PoruEvent"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});




