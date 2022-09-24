const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "volume",
  args: false,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    let player = await client.poru.players.get(message.guild.id)

    if(!args[0]){
        const embed = new MessageEmbed()
      .setColor(client.config.embedColor)
.setDescription(`The current volume is set to **${player.volume}%**`)
  message.channel.send({embeds: [embed]})
    } else {
      if(150 < args[0]){
          const embed = new MessageEmbed()
      .setColor(client.config.embedColor)
.setDescription(`Please use a number between \`0-150\``)
  message.channel.send({embeds: [embed]})
      } else {
      
    player.setVolume(args[0])
      
      const embed = new MessageEmbed()
      .setColor(client.config.embedColor)
.setDescription(`The volume has been changed to **${args[0]}%**`)
  message.channel.send({embeds: [embed]})
          }
        }
      }
      
}
