const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "addcurrent",
    aliases: ["pl-addcurrent"],
    description: "Saves Current Song To Playlist.",
    args: true,
    usage: "<playlist name>",
    player: true,
    premium:true,
    inVc: true,
    sameVc: true,
   run: async (client, message, args) => {

        const Name = args[0];
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        const player = client.poru.players.get(message.guild.id);
        if (!player.currentTrack) {
            let thing = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription("There is no music playing.");
            return message.reply({ embeds: [thing] });
        }
        if (!data) {
            return message.reply({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        const song = player.currentTrack.info;
        let oldSong = data.songs;
        if (!Array.isArray(oldSong)) oldSong = [];
        oldSong.push({
            "title": song.title,
            "uri": song.uri,
            "author": song.author,
            "duration": song.duration
        });
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $push: {
                    songs: {
                    title: song.title,
                    uri: song.uri,
                    author: song.author,
                    duration: song.duration
                        }

                }
            });
        const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setAuthor(`Added Song To Playlist ${Name}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`<a:queue:987713106450980865> [${song.title.substring(0, 63)}](${song.uri})`)
        return message.channel.send({ embeds: [embed] })

    }
}