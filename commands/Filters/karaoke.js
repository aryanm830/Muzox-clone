const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "karaoke",
  usage: `karaoke`,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

player.filters.setKaraoke(!player.filters.karaoke)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**karaoke** mode is now ${player.filters.karaoke ? "**enabled**" : "**disabled**"} `)
message.channel.send({embeds: [embed]})
  }
  }
