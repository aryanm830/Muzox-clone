const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {

name : "node",
description : "gives You the node information",
run : async (client,interaction,args) => {

const em1 = new MessageEmbed();

     const all = 
            `Node :: 🟢 Private [ Radio ]` ;
            
       

        const embed = new MessageEmbed()
            .setColor(`${client.config.embedColor}`)
            .setAuthor('Node Statistics')
            .setDescription(`\`\`\`${all}\`\`\``)
        interaction.reply({embeds: [embed]})
}



}