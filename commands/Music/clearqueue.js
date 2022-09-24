module.exports = {
  name: "clearqueue",
aliases: ["cq", "clear"],
   
  	description: "Removes all tracks from the queue and stop the player.",
	  args: false,
    usage: "<Clear Number of song in queue>",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    const memberChannel = message.member.voice.channel.id

    const player = client.poru.players.get(message.guild.id)

    
    let queueLength = player.queue.length

    player.queue.clear();

    message.reply(`<a:success:959656335044116490> Cleared all songs in queue.`)

  }
}