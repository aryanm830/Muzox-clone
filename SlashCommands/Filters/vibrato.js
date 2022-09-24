const { MessageEmbed, Interaction } = require("discord.js")
module.exports = {
  name: "vibrato",
  description:"Sets vibrato Filter",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction, args) => {
      let player = client.poru.players.get(interaction.guild.id) 

player.filters.setVibrato(!player.filters.vibrato)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**Vibrato** mode is now ${player.filters.karaoke ? "**enabled**" : "**disabled**"} `)
interaction.reply({embeds: [embed]})
  }
  }
