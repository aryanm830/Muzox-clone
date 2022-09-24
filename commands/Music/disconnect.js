module.exports = {
  name: "disconnect",
 aliases: ["dc"],
 
    description: "Disconnects the bot.",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, message, args) => {

    const player = client.poru.players.get(message.guild.id)

    player.destroy()

    message.react("<:success:984369679080509450>")

  }
}