const { MessageEmbed,  MessageButton, MessageActionRow, Permissions } = require('discord.js')

    module.exports = {
    name: "alert",
    
    aliases: [ "alert" ],
    description: "Shows the Important alerts announced by the developer",
    args: false,
    usage: "alert",
   
    run: async (client, message, args) => {
         const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription("Select any one Category to continue with news")
        
       const Announcment = new MessageButton().setCustomId("announcement").setLabel("Announcement").setStyle("SECONDARY");
        
        const Patch = new MessageButton().setCustomId("patch").setLabel("Patch Notes").setStyle("SECONDARY");
        
          
        
        const row = new MessageActionRow().addComponents(Announcment, Patch);
        message.channel.send({embeds: [embed], components: [row]})
        }
        }
