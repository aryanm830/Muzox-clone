const {
    MessageEmbed
  } = require(`discord.js`);
  module.exports = {
    name: `clearfilter`,    
    description: `Clears all Filters`,
    usage: ['cf','clearfilters'],
    aliases:['cf'],
     player: true,
    inVc: true,
    sameVc: true,
    run: async (client, message, args) => {
      const player = client.poru.players.get(message.guild.id);
      
          await player.filters.clearFilters;
      const emb = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setDescription(`<:success:984369679080509450> **Cleared All Filters**`)
          
      return message.channel.send({embeds: [emb]})
      }
    }
      