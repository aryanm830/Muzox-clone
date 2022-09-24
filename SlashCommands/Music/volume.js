const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "volume",
  description: "set the Volume!",
  inVc: true,
  sameVc: true,
  options:  [{
    name: 'volume',
    type: ApplicationCommandOptionType.Number,  
    description: 'Sets To this Volume',
    required: true,
  }],
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);

    if(isNaN(interaction.options.getNumber('volume'))) return interaction.reply( { embeds: [{
        color: client.config.embedColor,
        description: `volume must be a real number!` // done here
      }]})
    player.setVolume(interaction.options.getNumber('volume'));

    interaction.reply( { embeds: [{
        color: client.config.embedColor,
        description: `Volume is set to: ${interaction.options.getNumber('volume')}`
      }]})
  }
} 
