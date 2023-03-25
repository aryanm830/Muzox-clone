const discord = require('discord.js');
module.exports = {
  name: "clearqueue",
aliases: ["cq", "clear"],
   
  	description: "Removes all tracks from the queue and stop the player.",
	  args: false,
    usage: "<Clear Number of song in queue>",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    const memberChannel = message.member.voice.channel.id

    const player = client.poru.players.get(message.guild.id)

    
    let queueLength = player.queue.length
if (queueLength < 2) {
 return message.reply({
    embeds: [
                  new discord.EmbedBuilder()
                  .setDescription("**There is no song in the queue to be cleared!**")
                  .setColor(client.config.embedColor)]
  })
}
    player.queue.clear();
const e = new discord.EmbedBuilder()
    .setColor(client.config.embedColor)
    .setAuthor({
      name: `Successfully cleared ${player.queue.length} songs from queue!`,
      iconURL: client.user.displayAvatarURL()
    })
    
  }
}