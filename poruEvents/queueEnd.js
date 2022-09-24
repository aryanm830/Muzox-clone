const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, player, message) => {
  player.message?.delete().catch(e => null) 
  const channel = client.channels.cache.get(player.textChannel);
  
    if(player._247) return;
  const end = new MessageEmbed()
    .setColor(client.config.embedColor)
        .setTitle(`Queue Ended\nThanks for using our service!`)
        .setDescription(`Queue More songs and have fun and dont forget to vote ! Come join our [support server](https://discord.gg/eYdCRGqrnY) to get information about updates, issues and for discussions about bot features!`)
        .setImage(`https://media.discordapp.net/attachments/984799594787524668/990842585239130182/20220627_100911.jpg`)
    .setFooter(`Your suggestions and opinions are always considered`)
  
 channel?.send({embeds: [end]});
  
  player.destroy();
    
}