const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed, message } = require('discord.js')

module.exports = {
    name: "feedback",
    description: "feedback command",
 
    aliases: ["feedback"],
    usage: "feedback",
     async run(client, message, args) {
const user = message.author;
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setDescription(`Please write the feedback message to send`)
             message.channel.send({embeds: [embed]})
} else { 
   
    const row = new MessageActionRow()
           .addComponents(
               new MessageButton()
    .setEmoji("995665552133607434")
    .setCustomId('Done')
    .setStyle("SUCCESS"),
               
             new MessageButton()
    .setEmoji("995665727690391582")
    .setCustomId('Undone')
    .setStyle("DANGER")         
                         );
         const thing = new MessageEmbed()
         .setColor(client.config.embedColor)
        .setAuthor(`Hey User Thanks for Giving Feedback`)
         .setDescription(`Are you satisfied?\n<a:ThumbsUp:995665552133607434> Click on this button if you are satisfied\n<a:SC_Thumbs_Down:995665727690391582> Click on this buttons if you are not satisfied\n\nMessage you provided for feedback is: ${args[0]}`)
         .setFooter(`Thank you for supporting and giving feedback`)
         
        message.channel.send({embeds: [thing], components: [row]});
    const ft = new MessageEmbed()

        .setColor(`#63e963`)

        .setTitle(`${user.username}#${user.discriminator} (${user.id}) Feedback:`)

        .setDescription(`${args}`)

        .addField("On the server:", `${message.guild.name}`)

        .addField("Server ID:", `${message.guild.id}`)

        return client.channels.cache.get("979637918983417906").send({embeds: [ft]});
 }
             
    }
}