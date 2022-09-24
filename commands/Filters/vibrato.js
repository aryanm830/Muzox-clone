const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "vibrato",
  usage: `vibrato`,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

player.filters.setVibrato(!player.filters.vibrato)

 const embed = new EmbedBuilder()
.setColor(client.config.embedColor)
 .setDescription(`**Vibrato** mode is now ${player.filters.vibrato ? "**enabled**" : "**disabled**"} `)
message.channel.send({embeds: [embed]})
  }
  }
