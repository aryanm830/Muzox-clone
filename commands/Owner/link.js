const { message } = require("discord.js");

const { post } = require("node-superfetch");
module.exports = {

name : "link",
  owner : true,
run : async (client,message,args) => {
  const nembed = new MessageEmbed()
  .setColor(`${client.config.embedColor}`)
  .setTitle("EVAL")
  .setDescription("<:error:984369648818602005> You are not allowed to run this command! Only the Owners are allowed to run this command!")            
  .setFooter(message.author.tag)

if (!client.config.owner.includes(message.author.id)) return message.reply({
  embeds: [nembed]
});
    
  
client.guilds.cache.forEach(guild => {
    let channel = guild.channels.cache.last();
    createLink(channel,guild,message);
});

async function createLink(chan,guild,message) {
let invite = await chan.createInvite({
    maxAge: 0, 
maxUses: 0}).catch(console.error);
try{
   message.channel.send(guild.name + '|'+ 'discord.gg/' + invite);
}catch (e) {
   message.channel.send(guild.name + '|' + 'no link available');
}
}
}};