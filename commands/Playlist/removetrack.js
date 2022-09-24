const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "removetrack",
    aliases: ["pl-removetrack"],
    description: "Removes A Track From Playlist.",
    args: true,
    usage: "<playlist name> <track number>",
    premium:true,
   
    run: async (client, message, args) => {

        const Name = args[0];
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        const Options = args[1];
        if (!Options || isNaN(Options)) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> Invalid track number provided for Playlist ${Name}.`)] });
        }
        let tracks = data.Playlist;
        if (Number(Options) >= tracks.length || Number(Options) < 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> Invalid track number provided for Playlist ${Name}.`)] });

        }
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $pull: {
                    songs: data.songs[Options]
                }
            });
            const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setAuthor(`Removed Song From Playlist ${Name}`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/wrCzESkVzK")
            .setDescription(`<a:queue:987713106450980865> [${tracks[Options].title.substring(0, 63)}](${tracks[Options].uri})`);
            return message.channel.send({embeds: [embed]});
    }
};