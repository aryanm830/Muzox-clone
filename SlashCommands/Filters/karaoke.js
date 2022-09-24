const { MessageEmbed, Interaction } = require("discord.js")
module.exports = {
  name: "karaoke",
  description:"Sets karoke Filter",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction, args) => {
      let player = client.poru.players.get(interaction.guild.id) 

player.filters.setKaraoke(!player.filters.karaoke)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**karaoke** mode is now ${player.filters.karaoke ? "**enabled**" : "**disabled**"} `)
interaction.reply({embeds: [embed]})
  }
  }
