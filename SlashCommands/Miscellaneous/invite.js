const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Shows my invite links!",
    
   run: async (client, interaction, args) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
                
            new MessageButton()
    .setLabel("Radio Music")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=902842676024606741&permissions=0&scope=bot%20applications.commands`) ,
       
        new MessageButton()
    .setLabel("World")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=936647052815925349&permissions=8&scope=bot%20applications.commands`)
  );

          
          interaction.reply({components: [row]})
    }
}