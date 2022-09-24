const { MessageEmbed } = require('discord.js')
const { mem, cpu} = require('node-os-utils');
const packageJSON = require("../../package.json");
const discordJSVersion = packageJSON.dependencies["discord.js"];
const User = require("../../Models/User");

const os = require('os');

module.exports = {

name : "stats",
description : "Stats of bot",
run : async (client,interaction,args) => {
 let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

      let data = await User.findOne({userId: interaction.user.id});
      if(!data) data = await User.create({userId: interaction.user.id});
        
       const { totalMemMb, usedMemMb } = await mem.info();
       const cpus = os.cpus();
       const cpu = cpus[0];
       const total = Object.values(cpu.times).reduce(
        (acc, tv) => acc + tv, 0
    );
    const usage = process.cpuUsage();
const currentCPUUsage = (usage.user + usage.system) * 1000;


       
     
      let users = 0;
      client.guilds.cache.forEach(guild => {
        users += guild.memberCount;
      })
      const duration1 = Math.round((Date.now() - interaction.client.uptime)/1000);
        
        const memusage = process.memoryUsage();
  const embed = new MessageEmbed()
        
        .setColor(`${client.config.embedColor}`)
        .setAuthor({ name: "Bot Information", iconURL: "https://cdn.discordapp.com/avatars/887200832829915166/f7c0f0e57f8b9134aa455c2166fe2f25.png", url: "https://discord.gg/radio"})
        .setDescription(`What's up ${interaction.user.username}! I am ${client.user.username}, a cool discord music bot for your server!`)
        .addField(`<:stats:985100769520930816> Stats`,
        `➜ **${client.guilds.cache.size}** Servers\n➜ **${users}** Users\n➜ **${client.channels.cache.size}** Channels\n`)
        .addField(`Command Used By You`,`${data.count} Message commands\n${data.ccount} Slash Commands `)

        .addField(`<:links:985105785921081344> Links`,
        `➜ [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)\n➜ [Support Server](https://discord.gg/wrCzESkVzK)\n➜ [Vote](https://top.gg/bot/${client.user.id}/vote)`)
        .addField(`<:gi:985100765783810151> General Information`,
        `➜ Connections: **${connectedchannelsamount}**\n➜ Platform: \`${os.platform()}\`\n➜ CPU Usage:\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\n➜ RAM Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}Mb\`\n➜ Ping: \`${client.ws.ping}ms\`\n➜ Up Since: <t:${duration1}:R> `)
        
        .addField(`<:dev:978563383580295188> Developers`,`\`\`\`js\n! ARYAN.NFT#0082\nBraylon ඞ#5950\n𐑺 ܸ ׄ ּ Ƙ Ɩ Լ Լ Є Ʀ#0001\`\`\``)
        .addField(`<:djs:984372533002395720> Discord.JS Version`,`\`\`\`js\n${discordJSVersion}\`\`\``)
        .addField(`<:nodejs:984372538236891196> Node.JS Version`,`\`\`\`js\n${process.version}\`\`\``)
        .addField(`<:premiumbadge:967414570169802832> Poru Client Version`,`\`\`\`js\nLatest\`\`\``)
        .setThumbnail(`https://cdn.discordapp.com/avatars/887200832829915166/f7c0f0e57f8b9134aa455c2166fe2f25.png`)
        .setFooter(`Thank you for your continued support to ${client.user.username}. <3`)
        interaction.reply({embeds: [embed]})

}



}