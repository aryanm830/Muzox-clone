const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "timescale",
  usage: `timescale`,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

player.filters.setTimescale(!player.filters.timescale)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**Timescale** mode is now ${player.filters.timescale ? "**enabled**" : "**disabled**"} `)
message.channel.send({embeds: [embed]})
  }
  }
