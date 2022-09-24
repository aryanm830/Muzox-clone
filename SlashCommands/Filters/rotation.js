const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "rotation",
  description:"Sets Rotation Filter",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction, args) => {
      let player = client.poru.players.get(interaction.guild.id) 

player.filters.setRotation(!player.filters.rotation)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**Rotation** mode is now ${player.filters.karaoke ? "**enabled**" : "**disabled**"} `)
interaction.reply({embeds: [embed]})
  }
  }
