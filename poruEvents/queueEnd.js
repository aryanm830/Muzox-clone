const { EmbedBuilder } = require('discord.js')

module.exports.run = async (client, player, message) => {
  player.message?.delete().catch(e => null) 
  const channel = client.channels.cache.get(player.textChannel);
  
    if(player._247) return;
  const end = new EmbedBuilder()
    .setColor(client.config.embedColor)
        .setAuthor({name:`Queue Ended`,iconURL:client.user.displayAvatarURL()})
        .setDescription(`Queue More Songs To Keep The Party Going`)
        
  
 channel?.send({embeds: [end]});
  
  player.destroy();
    
}