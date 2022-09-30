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
    .setLabel("Radio Music")
    .setStyle("Link")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=902842676024606741&permissions=0&scope=bot%20applications.commands`) ,
       
        new ButtonBuilder()
    .setLabel("World")
    .setStyle("Link")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=936647052815925349&permissions=8&scope=bot%20applications.commands`)
  );

          
           message.channel.send({components: [row]})
    }
}