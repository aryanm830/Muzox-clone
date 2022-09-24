const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "rotation",
  usage: `rotation`,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

player.filters.setRotation(!player.filters.rotation)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**Rotation** mode is now ${player.filters.rotation ? "**enabled**" : "**disabled**"} `)
message.channel.send({embeds: [embed]})
  }
  }
