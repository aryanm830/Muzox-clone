const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

const { post } = require("node-superfetch");
module.exports = {

name : "reboot",
description : "reboot the bot [owner only]",
  owner : true,
run : async (client,interaction,args) => {
    if (!client.config.owner.includes(interaction.member.user.id)) {
        const nop = new MessageEmbed()
        .setColor("RED")
        .setDescription(`<:error:984369648818602005> You are not allowed to run this command! Only the Owners are allowed to run this command!`)
        return interaction.reply({embeds: [nop]})
      }
      try{
        interaction.reply({ embeds: [new MessageEmbed().setTitle("").setDescription("<a:loading:879577672303378442> Restarting Bot!")] }).then(msg => client.destroy())
          .then(() => client.login(process.env.TOKEN));
          
            interaction.channel.send({content:
                "Restarted Bot!"})
      } catch (e) {
        console.log(String(e.stack).bgRed)
        const emesdf = new MessageEmbed()
        .setColor("RED")
        .setAuthor({name: 'An Error Occurred'})
        .setDescription(`\`\`\`${e.message}\`\`\``);
        return interaction.reply({embeds: [emesdf]});
      }

}
}