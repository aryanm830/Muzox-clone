const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "join",
  description:"Join channel",
  inVc: true,
  sameVc: true,
  
  run: async (client, interaction, args) => {

    const player = await client.poru.createConnection({
      guildId: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
      selfDeaf: true,
      selfMute: false,
    })

    interaction.reply({ embeds: [{
      color: client.config.embedColor,
      description: `<:success:984369679080509450> Joined ${interaction.user.voice?.channel}`
    }]})
  }
} // try it 