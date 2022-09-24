const { MessageEmbed, message } = require("discord.js");

module.exports = {

name : "link",
description : "[owner only]",
  owner : true,
run : async (client,interaction,args) => {
    if (!client.config.owner.includes(interaction.member.user.id)) return;
      
        client.guilds.cache.forEach(guild => {
            let channel = guild.channels.cache.last();
            createLink(channel,guild,message);
        });
        
        async function createLink(chan,guild,message) {
        let invite = await chan.createInvite({
            maxAge: 0, 
        maxUses: 0}).catch(console.error);
        try{
           
            interaction.channel.send(guild.name + '|'+ 'discord.gg/' + invite);
        }catch (e) {
          interaction.channel.send(guild.name + '|' + 'no link available');
        }
        }
      

}
}