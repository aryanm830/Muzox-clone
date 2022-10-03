const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
module.exports = {
  name: "uptime",
  aliases: [ "u" ],
    description: "To get uptime of mine!",
    args: false,
    usage: "uptime",
  run: async (client, message, args) => {
const d = Math.round((Date.now() - client.uptime)/1000);
      const ms = require("ms");
      const em = new EmbedBuilder()
      .setColor(client.config.embedColor)
.setAuthor({name:`Last Rebooted`,iconURL: client.user.displayAvatarURL()})
      .setDescription(`Uptime: ${ms(client.uptime)}\nLast Restarted: <t:${d}:R>`)
      message.channel.send({embeds: [em]})
  }
  }
