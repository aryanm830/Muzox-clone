const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "addqueue",
    aliases: ["pl-addqueue"],
    description: "Saves Current Queue To Playlist",
    args: true,
    usage: "<playlist name>",
    player: true,
    premium:true,
    inVc: true,
    sameVc: true,
    run: async (client, message, args) => {

        const Name = args[0];
        const player = client.poru.players.get(message.guild.id);
        if (!player.currentTrack) {
            let thing = new EmbedBuilder()
                .setColor("#ff0000")
                .setDescription("There is no music playing.");
            return message.reply({ embeds: [thing] });
        }
        const data = await db.find({ UserId: message.author.id, PlaylistName: Name })
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        const song = player.currentTrack.info;
        const tracks = player.queue;

        let oldSong = data.songs;
        if (!Array.isArray(oldSong)) oldSong = [];
        const newSong = [];
        if (player.currentTrack) {
            newSong.push({
                "title": song.title,
                "uri": song.uri,
                "author": song.author,
                "duration": song.duration
            });
        }
        for (const track of tracks)
            newSong.push({
                "title": track.info.title,
                "uri": track.info.uri,
                "author": track.info.author,
                "duration": track.info.duration
            });
        const playlist = oldSong.concat(newSong);
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name,
        },
            {
                $set: {
                    songs: playlist
                }

            });
    }}
