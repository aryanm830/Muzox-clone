const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "timescale",
  description:"Sets timescale Filter",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction, args) => {
      let player = client.poru.players.get(interaction.guild.id) 

player.filters.setTimescale(!player.filters.timescale)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**Timescale** mode is now ${player.filters.karaoke ? "**enabled**" : "**disabled**"} `)
interaction.reply({embeds: [embed]})
  }
  }
