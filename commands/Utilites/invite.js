const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "invite",
    
    aliases: [ "addme", "Links", "inv"],
    description: "Shows my invite Links!",
    args: false,
    usage: "",
    owner: false,
   run: async (client, message, args) => {
         
         
    const row = new ActionRowBuilder()
			.addComponents(
                
            new ButtonBuilder()
    .setLabel(`${client.user.username}`)
    .setStyle("Link")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
   );

          
           message.channel.send({components: [row]})
    }
}
