const { EmbedBuilder } = require("discord.js");


    module.exports = {
  name: "prefix",
  run: async (client, message, args, prefix) => {
      
 if (!args[0]) {
    const embed = new EmbedBuilder()
        .setDescription(`The current prefix for this server is \`${client.prefix}\``)
        .setColor(client.config.embedColor)
      return message.channel.send({ embeds: [embed]})
     }
     if (!message.member.permissions.has('MANAGE_GUILD') && !'889005501701029919'.includes(message.author.id)) return message.channel.send({embeds: [new EmbedBuilder().setColor("#FF0000").setDescription(`<:error:938293159153238076> You don't have permission **Manage Server**  for channel **#${message.channel.name}**`)]});
    if (args[1]) {
       const thing = new EmbedBuilder()
        .setDescription("You can not set prefix a double argument")
        .setColor(client.config.embedColor)
      return message.channel.send({ embeds: [thing] });
    }

    if (args[0].length > 3) {
       const pf = new EmbedBuilder()
        .setDescription("You can not send prefix more than 3 characters")
        .setColor(client.config.embedColor)
      return message.channel.send({ embeds: [pf] });
    }

    if (args.join("") === "+") {
      client.db.delete(`prefix_${message.guild.id}`);
      const tf = new EmbedBuilder()
        .setDescription("Reseted Prefix")
        .setColor(client.config.embedColor)      
        message.channel.send({ embeds: [tf] });
    }

    client.db.set(`prefix_${message.guild.id}`, args[0]);
    const nc = new EmbedBuilder()
       .setDescription(`Now bot's prefix has been set to \`${args[0]}\``)
       .setColor(client.config.embedColor)
    await message.channel.send({ embeds: [nc] });
  }
};