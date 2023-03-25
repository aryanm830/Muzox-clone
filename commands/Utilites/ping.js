const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : "ping",
    aliases: ['ping'],
   usage: ['ping'],
description: "gives the latency of bot",
    run : async (client,message,args)=> {
        
         const ms = require('ms')
        const embed = new EmbedBuilder()
        .setAuthor({name: `Ping | ${client.ws.ping}ms`, iconURL:message.author.displayAvatarURL()})
       .setColor(client.config.embedColor)

        const g = await message.channel.send({embeds: [embed]})
    }
}