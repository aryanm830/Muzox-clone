const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "join",
  inVc: true,
  run: async (client, message, args) => {
let player = client.poru.players.get(message.guild.id)
    if (player) {
return message.reply({
   embeds: [
                  new EmbedBuilder()
                  .setDescription("**There is already a player for this guild!**")
                  .setColor(client.config.embedColor)]
 })
}
    const player1 = await client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeaf: true,
      selfMute: false,
    })
    
    message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription(`**Successfully Joined Vc • ${message.member.voice.channel}**`)
                  .setColor(client.config.embedColor)
   ] })
//interaction.guild.members.me.voice.channel
  }
}
