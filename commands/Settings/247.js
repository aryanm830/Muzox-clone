const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "247",
  aliases: ["24h", "24/7", "24*7"],
description: "Toggles 24/7 mode in the server.",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, message, args) => {
if (!message.member.permissions.has('MANAGE_GUILD') && !'889005501701029919'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#FF0000").setDescription(`<:error:938293159153238076> You don't have permission **Manage Server**  for channel **#${message.channel.name}**`)]});
      const player = client.poru.players.get(message.guild.id)
      if(player._247 === false) {
          player._247 = true; 
      } 
      else {
          player._247 = false;
           

      }
      const embed = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setDescription(`24/7 mode is now ${!player._247 ? "**disabled**" : "**enabled**"}.`)
message.channel.send({embeds: [embed]})
      
      }
}