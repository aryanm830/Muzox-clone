const {
    MessageEmbed
  } = require(`discord.js`);
  module.exports = {
    name: `china`,
    
    description: `Applies China Filter To The Song`,
    usage: `china`,
     player: true,
    inVc: true,
    sameVc: true,
    run: async (client, interaction, args) => {
      const player = client.poru.players.get(interaction.guild.id);
      
      
       if(!player.filters.timescale){ player.filters.setTimescale({
          "speed": 0.75,
          "pitch": 1.25,
          "rate": 1.15
        })}else{player.filters.setTimescale(false)}
      
      const emb = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setDescription(`**China** mode is now ${player.filters.timescale ? "**enabled**" : "**disabled**"} `)
          
      return interaction.reply({embeds: [emb]})
      }
    }
      