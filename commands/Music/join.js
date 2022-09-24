module.exports = {
  name: "join",
  inVc: true,
  run: async (client, message, args) => {

    const player = await client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeaf: true,
      selfMute: false,
    })
    
    message.react(`<:success:984369679080509450>`)

  }
}
