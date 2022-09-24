const { MessageEmbed,  MessageButton, MessageActionRow, Permissions } = require('discord.js')

    module.exports = {
    name: "alert",    
    description: "Shows the Important alerts announced by the developer",
    usage: "alert",
   
    run: async (client, interaction, args) => {
         const embed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription("Select any one Category to continue with news")
        
       const Announcment = new MessageButton().setCustomId("announcement").setLabel("Announcement").setStyle("SECONDARY");
        
        const Patch = new MessageButton().setCustomId("patch").setLabel("Patch Notes").setStyle("SECONDARY");
        
          
        
        const row = new MessageActionRow().addComponents(Announcment, Patch);
        interaction.reply({embeds: [embed], components: [row]})
        }
        }
