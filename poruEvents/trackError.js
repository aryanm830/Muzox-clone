const { EmbedBuilder } = require('discord.js')

module.exports.run = async (client, player, track) => {
  player.message?.delete().catch((e) => {
    console.log(e)
  }
  )

  const channel = client.channels.cache.get(player.textChannel)
  const thing = new EmbedBuilder()
    .setColor(client.config.embedColor)
    .setTitle(`Error Playing`)
    .setDescription(`There was an error while playing the track`);
  channel?.send({ embeds: [thing] })
  console.log(`Error when loading song! Track error is in [${player.guildId}]`, "error");


  if (!player.voiceChannel) player.stop();



}