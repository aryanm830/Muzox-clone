const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "seek",
  description: "seek the player!",
  inVc: true,
  sameVc: true,
  options:  [{
    name: 'seek',
    type: ApplicationCommandOptionType.Number,  
    description: 'to seek please enter in seconds ',
    required: true,
  }],
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);
  if(!player.currentTrack.info.isSeekable){
  interaction.reply( { embeds: [{
        color: client.config.embedColor,
        description: `Track is not seekable`
      }]})
}
    
player.seekTo(interaction.options.getNumber('seek')*1000)
    
    return interaction.reply( { embeds: [{
        color: client.config.embedColor,
        description: `Seeked to \`${interaction.options.getNumber('seek')}\``
      }]})
  }
  }
 