const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "blacklist",
  description:"blacklist the given user",
  aliases:['bl'],
  owner: true,
  run: async (client, message, args) => {
    
    const nembed = new MessageEmbed()
      .setColor(`${client.config.embedColor}`)
      .setTitle("EVAL")
      .setDescription("<:error:984369648818602005> You are not allowed to run this command! Only the Owners are allowed to run this command!")            
      .setFooter(message.author.tag)
  
  if (!client.config.owner.includes(message.author.id)) return message.reply({
      embeds: [nembed]
  });
        
      
      
        let member = client.users.cache.get(args[0]);
        if(!member){
            const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
           .setDescription(`Invalid Id or User not found`)
            message.channel.send({embeds: [embed]})
            } 
                const user = client.db.set(`bl_${args[0]}`, `true`)
                user.blacklisted = true;
            const thing = new MessageEmbed()
            .setColor(`#ff0000`)
     .setDescription(`<a:success:959656335044116490> <@${args[0]}>(${args[0]}) has been added as **blacklisted** user.`)
            return message.channel.send({embeds: [thing]})
      
  }
  }