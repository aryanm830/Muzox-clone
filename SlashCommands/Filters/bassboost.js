const { MessageEmbed, Interaction } = require("discord.js")
module.exports = {
  name: "bassboost",
  description:"Sets bassboost Filter",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction, args) => {
      let player = client.poru.players.get(interaction.guild.id) 

player.filters.setBassboost(!player.filters.bassboost)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**Bassboost** mode is now ${player.filters.bassboost ? "**enabled**" : "**disabled**"} `)
interaction.reply({embeds: [embed]})
  }
  }
