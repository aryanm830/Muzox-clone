const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

const { post } = require("node-superfetch");
module.exports = {

name : "serverlist",
description : "list of server the bot is in [owner only]",
  owner : true,
run : async (client,interaction,args) => {
  const nembed = new MessageEmbed()
  .setColor(`${client.config.embedColor}`)
  .setTitle("EVAL")
  .setDescription("<:error:984369648818602005> You are not allowed to run this command! Only the Owners are allowed to run this command!")            
  .setFooter(interaction.member.user.tag)

if (!client.config.owner.includes(message.author.id)) return message.reply({
  embeds: [nembed]
});
    
  

  let i0 = 0;
      let i1 = 100;
      let page = 2;

      let description =
        `Total Servers - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
          .slice(0, 100)
          .join("\n\n");
      let embed = new MessageEmbed()
        
        .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic : true}))
        
        .setColor(client.config.embedColor)
     //   .setFooter(`Page - ${page}/${Math.ceil(`client.guilds.cache.size / 10)}`)
        .setDescription(description);


   interaction.reply({ embeds: [embed] })
   if(!interaction.user.id !== client.owner.id) return;
  let des = `your are not my owner`;
    
 let embed1 = new MessageEmbed()
        
        .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic : true}))
        
        .setColor(client.config.embedColor)
     //   .setFooter(`Page - ${page}/${Math.ceil(`client.guilds.cache.size / 10)}`)
        .setDescription(des);
  interaction.reply({ embeds: [embed1] })
  
}



}