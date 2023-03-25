function moveArrayElement(arr, fromIndex, toIndex) {
  arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
  return arr;
}
const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "move",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args, prefix) => {

    const player = client.poru.players.get(message.guild.id);

    const position = Number(args[0]);

    const from = args[0] ? parseInt(args[0], 10) : null;
    const to = args[1] ? parseInt(args[1], 10) : null;

    if (from === null || to === null) {
      const invalid = new EmbedBuilder()
        .setTitle("Invalid Usage")
        .setColor(client.config.embedColor)
        .setDescription(`Corect Usage: \`${prefix}move <from> <to>\``)
      return message.channel.send({
        embeds: [invalid]
      })
    }
    if (from === to || (isNaN(from) || from < 1 || from > player.queue.length) || (isNaN(to) || to < 1 || to > player.queue.length))
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("> There's no song to move in the queue.")
            .setColor(client.config.embedColor)]
      })


    const moved = player.queue[from - 1];
    moveArrayElement(player.queue, from - 1, to - 1)

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${moved.info.title} moved to \`${to}\``)
          .setColor(client.config.embedColor)]
    })
  }
}