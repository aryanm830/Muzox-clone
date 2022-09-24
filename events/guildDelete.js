const { EmbedBuilder, WebhookClient } = require('discord.js');
const { Webhooks: {server_remove} } = require('../config.json');
const moment = require('moment');

module.exports.run = async (client, guild) => {
  
  const player = client.poru.players.get(guild.id);
  if(player) player.destroy();
  
  let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount
})
let links = `https://cdn.discordapp.com/banners/`+guild.id+`/`+guild.banner+`.`+`webp?size=1024`;
  const embed = new EmbedBuilder()
    .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp/1000)}> (<t:${Math.round(guild.createdTimestamp/1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp/1000)}> (<t:${Math.round(guild.joinedTimestamp/1000)}:R>)`)
      
    .addField(`**${client.user.username}'s Total Servers**`, `\`\`\`js\n${client.guilds.cache.size}\`\`\``, true)
    .addField(`**${client.user.username}'s Total Users**`, `\`\`\`js\n${mcount}\`\`\``, true)
    if(guild.available) embed.setTitle(guild.name)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024})) 
    .setColor(client.config.embedColor)
    if(guild.vanityURLCode)
    {
      let temp = `https://discord.gg/`+guild.vanityURLCode;
    embed.setURL(temp)
    }
    if(guild.banner)
    embed.setImage(links)
    const web3 = new WebhookClient({ url: server_remove });
    web3.send({content: "**Server Left**", embeds: [embed]})
}