const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "repeat",
  args: false,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    let player = client.poru.players.get(message.guild.id)

    if (player.loop === 0) {
        const embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setDescription(`<@${message.author.id}> has enabled repeating of the current track`)
      player.TrackRepeat();
      message.channel.send({embeds: [embed]})
    } else if (player.loop === 1) {
        const thing = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setDescription(`<@${message.author.id}> has enabled repeating of the whole track`)
        player.QueueRepeat();
      message.channel.send({embeds: [thing]})
    } else if (player.loop === 2) {
       const sht = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setDescription(`<@${message.author.id}> has disabled the repeating`)
        player.DisableRepeat();
      message.channel.send({embeds: [sht]})
    }
  }
}