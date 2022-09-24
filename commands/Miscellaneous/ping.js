const { MessageEmbed } = require('discord.js');

module.exports = {
    name : "ping",
    aliases: ['ping'],
   usage: ['ping'],
description: "gives the latency of bot",
    run : async (client,message,args)=> {
        function getEmoji(amount) {
        let emoji;
        if (amount <= 120) {
            emoji = '🟢';
        } else if (amount <= 800) {
            emoji = '🟡';
        } else {
            emoji = '🔴';
        }
     return emoji;
          }
          function diff(amount) {
        let emoji;
        if (amount <= 120) {
            emoji = '🟢';
        } else if (amount <= 800) {
            emoji = '🟡';
        } else {
            emoji = '🔴';
        }
     return emoji;
          }
        function dt(amount) {
        let emoji;
        if (amount <= 5) {
            emoji = '🟢';
        } else if (amount <= 20) {
            emoji = '🟡';
        } else {
            emoji = '🔴';
        }
     return emoji;
          }
         const ms = require('ms')
        const embed = new MessageEmbed()
       .setColor(client.config.embedColor)
.setDescription(`\`Pinging\`\n\`Pinging\`\n\`Pinging\``)
        const g = await message.channel.send({embeds: [embed]})
        const da = await client.db.ping(ms)
        const pi = new MessageEmbed()
.setColor(client.config.embedColor)
.setDescription(`${getEmoji(client.ws.ping)} \`${client.ws.ping}ms\`\n${diff(g.createdTimestamp - message.createdTimestamp)} \`${g.createdTimestamp - message.createdTimestamp}ms\`\n${dt(client.db.ping(ms))} \`${da}ms\``)
    g.edit({embeds: [pi]})  
    }
}