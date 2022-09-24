const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "remove",
  args: true,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    let player = client.poru.players.get(message.guild.id)

    if (args[0] == 0) {
        const embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setDescription(`<:error:938293159153238076> You can't remove a song which is currently playing!`)
      message.channel.send({embeds: [embed]});
   }
        if (args[0] > player.queue.length) {
            const thing = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setDescription(`The song you're trying to remove is not in queue or not found by ${client.user.username}`)
                  message.channel.send({embeds: [thing]});
}
    player.queue.remove(args[0] - 1)
    return message.reply(`Removed track from queue`)
  }

}