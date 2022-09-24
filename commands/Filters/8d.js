const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "8d",
  usage: `8d`,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

player.filters.set8D(!player.filters._8d)

 const embed = new MessageEmbed()
.setColor(client.config.embedColor)
 .setDescription(`**8d** mode is now ${player.filters._8d ? "**enabled**" : "**disabled**"} `)
message.channel.send({embeds: [embed]})
  }
  }
