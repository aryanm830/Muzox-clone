const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const User = require("../Models/User");

module.exports.run = async (client, message) => {
    
  try {
 let prefix = await client.db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = client.prefix;
        
      let user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id })
      
const premrow = new ActionRowBuilder()
     .addComponents(new ButtonBuilder()
     .setLabel("Premium")
     .setStyle("Link")
     .setURL("https://discord.gg/wrCzESkVzK"),
     new ButtonBuilder()
     .setLabel("Vote")
     .setStyle("Link")
     .setEmoji("<:vote:985926662552178748>")
     .setURL("https://top.gg/"));
        

      
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
var m = "";
try{
var p1 = client.poru.players.get(message.guild.id);
if(!p1) m = "null";
else {
const ch = message.guild.channels.cache.get(p1.voiceChannel);
    if(ch.rtcRegion === null) {
        m = "N/A";
    } else {
        m = ch.rtcRegion;
}
    }
}catch(e) {

}
        try {
    if (message.content.match(mention)) {
    
      const row = new ActionRowBuilder()
           .addComponents(
        new ButtonBuilder()
    .setLabel("Invite Me")
    .setStyle("Link")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
    new ButtonBuilder()
    .setLabel("Support Server")
    .setStyle("Link")
    .setURL("https://discord.gg/wrCzESkVzK"),
    new ButtonBuilder()
    .setLabel("Vote Me")
    .setStyle("Link")
    .setURL("https://top.gg/")
			);
      const embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setAuthor({name:'Settings For This Server',iconURL:client.user.displayAvatarURL() })
      
        .setDescription(`• My prefix here is \`${prefix}\` and / \nVoice Region: \`${m}\`\nServer Id: \`${message.guild.id}\`\n\nYou can play music by joining a voice channel and typing \`${prefix}play\`.\nType \`${prefix}help\` To Get All Commands Help Menu.`);
      message.channel.send({embeds: [embed], components: [row]})
}
            } catch (e) {
                console.log(e)
            }
        
        if (message.author.bot || !message.guild) return;
    /*let datab = ['701643179212013568', '921100377565302785', '558400760245911582'];

const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`)

const prefix1 = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;
    
 if(!datab.includes(message.author.id)){
                if (!message.content.startsWith(prefix1)) return;
            } 


    const args = datab.includes(message.author.id) == false ? message.content.slice(prefix1.length).trim().split(/ +/) :  message.content.startsWith(prefix1) == true ? message.content.slice(prefix1.length).trim().split(/ +/) : message.content.trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
*/
        
        
       const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [matchedPrefix] = message.content.match(prefixRegex);

        
 if (!message.member) message.guild.fetchMembers(message);
  
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);




           

 
  const cmd = args.shift().toLowerCase();


  
  if (cmd.length === 0) return;


  let command = client.commands.get(cmd)

  
  if (!command) command = client.commands.get(client.aliases.get(cmd))
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.members.me.voice.channelId;
 //If cooldowns map doesn't have a command.name key then create one.
 
  if (!command) return

    
    if (command.inVc && !memberChannel) {
      const join = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`You must be in a voice channel to use this command!`)
      return message.channel.send({embeds: [join]})
    }
  
  if (command.sameVc && player && botChannel !== memberChannel) {
const same = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`You must be in the same voice channel as me to use this command!`) 
    return message.channel.send({embeds: [same]})


  }
  
  if (command.player && !player) {
    const exist = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`There is nothing playing in this server!`) 


return message.channel.send({embeds: [exist]})
    }
    if (command.current && !player.currentTrack){

const exist = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`There is nothing playing in this server!`) 


message.channel.send({embeds: [exist]})
                     }
  
  if (command.args && !args.length) {
    const provide = new EmbedBuilder()
    .setColor(`#ff0000`)
    .setDescription(`You didn't provide any arguments!`)
    return message.channel.send({embeds: [provide]})
  }
  //nothinf
  
    
  //owner
   if (command.owner) {
      if (client.owner) {
        const devs = client.config.owner.find((x) => x === message.author.id);
        if (!devs)
          return message.channel.send({
            embeds: [embed.setDescription('Only My Owners can use this command!')],
          });
      }
     
    }
    user.count++;
    await user.save();
        
        
  if (command) command.run(client, message, args, prefix)

} catch (error) {
    console.error(error)
}


}