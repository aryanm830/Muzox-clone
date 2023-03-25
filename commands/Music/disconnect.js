const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "disconnect",
 aliases: ["dc"],
 
    description: "Disconnects the bot.",
  inVc: true,
  sameVc: true,
  player: false,
  run: async (client, message, args) => {

    const player = client.poru.players.get(message.guild.id)
if(!player){
  return message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription("There is no player for the guild!")
                  .setColor(client.config.embedColor)]
    })
}
    player.destroy()

    message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription("Disconnected!")
                  .setColor(client.config.embedColor)]
    })
  }
}