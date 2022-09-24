const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "bassboost",
  usage: ['bb','bassboost'],
  aliases:['bb'],
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

player.filters.setBassboost(!player.filters.bassboost)

 const embed = new EmbedBuilder()
.setColor(client.config.embedColor)
 .setDescription(`**Bassboost** mode is now ${player.filters.bassboost ? "**enabled**" : "**disabled**"} `)
message.channel.send({embeds: [embed]})
  }
  }
