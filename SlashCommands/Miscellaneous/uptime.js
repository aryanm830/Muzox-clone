const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");


module.exports = {

name : "uptime",
description : "Gives You Last Restart of the bot date",
run : async (client,interaction,args) => {


        const duration1 = Math.round((Date.now() - interaction.client.uptime)/1000);

const embed = new MessageEmbed()
.setColor(`${client.config.embedColor}`)      
.setDescription(`I am online from <t:${duration1}:R>`)

     interaction.reply({embeds: [embed]})
}



}