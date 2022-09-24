const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const User = require("../Models/User");

module.exports.run = async (client, message) => {
    
  try {
 let prefix = await client.db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = client.prefix;
        
      let user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id })
      
      if (data && data.Channel && message.channelId === data.Channel) return client.emit("setupSystem", message);
let datab = ['884067115110395925','889005501701029919','751100746434347090'];
const premrow = new ActionRowBuilder()
     .addComponents(new ButtonBuilder()
     .setLabel("Premium")
     .setStyle("LINK")
     .setURL("https://discord.gg/wrCzESkVzK"),
     new ButtonBuilder()
     .setLabel("Vote")
     .setStyle("LINK")
     .setEmoji("<:vote:985926662552178748>")
     .setURL("https://top.gg/"));
        

 if(datab.includes(message.author.id)) prefix = "";
      
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
        prefix = client.prefix;
      const row = new ActionRowBuilder()
           .addComponents(
        new ButtonBuilder()
    .setLabel("Invite Me")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
    new ButtonBuilder()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://discord.gg/wrCzESkVzK"),
    new ButtonBuilder()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/")
			);
      const embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setAuthor({name:'Settings For This Server',iconURL:client.user.displayAvatarURL })
      
        .setDescription(`• My prefix here is \`${prefix}\` and / \nVoice Region: \`${m}\`\nServer Id: \`${message.guild.id}\`\n\nYou can play music by joining a voice channel and typing \`${prefix}play\`.\nType \`${prefix}help\` To Get All Commands Help Menu.`);
      message.channel.send({embeds: [embed], components: [row]})
}
            } catch (e) {
                console.log(e)
            }
        
        if (message.author.bot || !message.guild) return;
        
        
        
         if (!message.content.startsWith(prefix)) return;
        
 if (!message.member) message.guild.fetchMembers(message);
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);




           

 
  const cmd = args.shift().toLowerCase();


  
  if (cmd.length === 0) return;


  let command = client.commands.get(cmd)

  const cooldowns = new Map();
  
  if (!command) command = client.commands.get(client.aliases.get(cmd))
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.me.voice.channelId;
 //If cooldowns map doesn't have a command.name key then create one.
 if(!cooldowns.has(command.name)){
  cooldowns.set(command.name, new Discord.Collection());
}
const current_time = Date.now();
const time_stamps = cooldowns.get(command.name);
const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if(time_stamps.has(message.author.id)){
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

      if(current_time < expiration_time){
          const time_left = (expiration_time - current_time) / 1000;

          return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
      }
  }

  //If the author's id is not in time_stamps then add them with the current time.
  time_stamps.set(message.author.id, current_time);
  //Delete the user's id once the cooldown is over.
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
  if (!command) return

    
    if (command.inVc && !memberChannel) {
      const join = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`<:error:938293159153238076> You must be in a voice channel to use this command!`)
      return message.channel.send({embeds: [join]})
    }
  
  if (command.sameVc && player && botChannel !== memberChannel) {
const same = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`<:error:938293159153238076> You must be in the same voice channel as me to use this command!`) 
    return message.channel.send({embeds: [same]})


  }
  
  if (command.player && !player) {
    const exist = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`<:error:938293159153238076> There is nothing playing in this server!`) 


return message.channel.send({embeds: [exist]})
    }
    if (command.current && !player.currentTrack){

const exist = new EmbedBuilder()
      .setColor(`#ff0000`)
        .setDescription(`<:error:938293159153238076> There is nothing playing in this server!`) 


message.channel.send({embeds: [exist]})
                     }
  
  if (command.args && !args.length) {
    const provide = new EmbedBuilder()
    .setColor(`#ff0000`)
    .setDescription(`<:error:938293159153238076> You didn't provide any arguments!`)
    return message.channel.send({embeds: [provide]})
  }
  //premium
  let user1 = client.userSettings.get(message.author.id);
    // If there is no user, create it in the Database as "newUser"
    if (!user1) {
      const findUser = await User.findOne({ Id: message.author.id });
      if (!findUser) {
        const newUser = await User.create({ Id: message.author.id });
        client.userSettings.set(message.author.id, newUser);
        user1 = newUser;
      } else return;
    }
    if (command.premium && user1 && !user1.isPremium) {
      const embed = new EmbedBuilder()
      .setDescription("You must [vote](https://top.gg/) me to use this command. If you want to disable this then [click here](https://discord.gg/wrCzESkVzK) to buy [premium](https://discord.gg/wrCzESkVzK) to listen interruption free **music**!")
      .setColor(client.config.embedColor)
    return message.channel.send({embeds: [embed], components: [premrow]})
      
    }
  //owner
   if (command.owner) {
      if (client.owner) {
        const devs = client.owner.find((x) => x === message.author.id);
        if (!devs)
          return message.channel.send({
            embeds: [embed.setDescription('Only My Owners can use this command!')],
          });
      }
     
    }
    user.count++;
    await user.save();
        
        
  if (command) command.run(client, message, args)

} catch (error) {
    console.error(error)
}


}