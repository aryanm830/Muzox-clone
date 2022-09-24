const { EmbedBuilder } = require('discord.js')

module.exports.run = async (client, player, track) => {
  player.message?.delete().catch(e => null) 
  
 const channel = client.channels.cache.get(player.textChannel.id)
    const thing = new EmbedBuilder()
        .setColor(client.config.embedColor)
      .setTitle(`Error Playing`)
        .setDescription(`There was an error while playing the track`);
    channel.send({embeds: [thing]})
    console.log(`Error when loading song! Track error is in [${player.guild}]`, "error");
    
      if (!player.voiceChannel) player.stop();
  
  
  
}