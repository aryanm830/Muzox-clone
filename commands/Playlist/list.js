const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
    name: "list",
    aliases: ["pl-list"],
    description: "Gives You The List Of The Playlists.",
    args: false,
    usage: "",
    premium:true,
    run: async (client, message, args) => {

        let data = await db.find({ UserId: message.author.id});
        if (!data.length) {
            return message.reply({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`You don't have any Playlist.`)] });
        }
           const embeds = new MessageEmbed()
          data.map((x, i) => embeds.addField(`**Playlist: ${++i} | Name: ${x.PlaylistName}**`, `**Tracks: ${x.songs.length} | Created On: <t:${x.CreatedOn}> (<t:${x.CreatedOn}:R>)**`))
              embeds.setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}))
              embeds.setColor(client.config.embedColor);
            return await message.channel.send({ embeds: [embeds] });

    }
};