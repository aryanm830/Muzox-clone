const {
    MessageEmbed
  } = require(`discord.js`);
  module.exports = {
    name: `clearfilter`,    
    description: `Clears all Filters`,
    usage: ['cf','clearfilters'],
   
     player: true,
    inVc: true,
    sameVc: true,
    run: async (client, interaction, args) => {
      const player = client.poru.players.get(interaction.guild.id);
      
          await player.filters.clearFilters;
      const emb = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setDescription(`<:success:984369679080509450> **Cleared All Filters**`)
          
      return interaction.reply({embeds: [emb]})
      }
    }
      