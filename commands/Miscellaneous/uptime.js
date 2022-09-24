const { MessageEmbed } = require("discord.js");
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
      const em = new MessageEmbed()
      .setColor(client.config.embedColor)
.setAuthor(`Last Rebooted`, client.user.displayAvatarURL())
      .setDescription(`Uptime: ${ms(client.uptime)}\nLast Restarted: <t:${d}:R>`)
      message.channel.send({embeds: [em]})
  }
  }