const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "delete",
    aliases: ["pl-delete"],
    description: "Deletes A Playlist.",
    args: true,
    usage: "<playlist name>",
    premium:true,
   
    run: async (client, message, args) => {

        const Name = args[0];
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        await data.delete();
        const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setDescription(`<:success:984369679080509450> Playlist **${Name}** Deleted`)
        return message.channel.send({ embeds: [embed] })
    }
}