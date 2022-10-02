const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const db = require("../../schema/playlist");
const { convertTime } = require("../../util/convert.js");
const lodash = require("lodash");

module.exports = {
    name: "info",
    aliases: ["pl-info"],
    description: "Gives You The Information Of A Playlist.",
    args: true,
    usage: "<playlist name>",
    premium:true,
    
    run: async (client, message, args) => {

        const Name = args[0];
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> You don't have any Playlist named **${Name}**.`)] });
        }
        let tracks = data.songs.map((x, i) => `${+i} - ${x.title.substring(0, 45)}... ${x.duration ? `${convertTime(Number(x.duration))}` : ""}`);
        const pages = lodash.chunk(tracks, 10).map((x) => x.join("\n"));
        let page = 0;
        var embed = new EmbedBuilder()
            .setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/wrCzESkVzK")
            .setColor(client.config.embedColor)
            .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.songs.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)
        const em = new EmbedBuilder()
        const em1 = new EmbedBuilder()
        if (pages.length <= 1) {
            return await message.reply({ embeds: [embed] })
        } else {

            let previousbut = new ButtonBuilder().setCustomId("playlist_cmd_ueuwbdl_uwu-previous").setEmoji("<:arl:1015559494018793522>").setStyle("SUCCESS");

            let nextbut = new ButtonBuilder().setCustomId("playlist_cmd_uwu-next").setEmoji("<:arr:1015559709371138048>").setStyle("SUCCESS");

            let stopbut = new ButtonBuilder().setCustomId("playlist_cmd_uwu-stop").setEmoji("⏹️").setStyle("DANGER");

            const row = new ActionRowBuilder().addComponents(previousbut, stopbut, nextbut);

            const m = await message.reply({ embeds: [embed], components: [row] });

            const collector = m.createMessageComponentCollector({
                filter: (b) => b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => { }),
                time: 60000 * 5,
                idle: 60000 * 5 / 2
            });

            collector.on("end", async () => {
                if (!m) return;
                await m.edit({ components: [new ActionRowBuilder().addComponents(previousbut.setDisabled(true), stopbut.setDisabled(true), nextbut.setDisabled(true))] });
            });

            collector.on("collect", async (b) => {
                if (!b.deferred) await b.deferUpdate().catch(() => { });
                if (b.customId === "playlist_cmd_ueuwbdl_uwu-previous") {
                    page = page - 1 < 0 ? pages.length - 1 : --page;
                    if (!m) return;
            embed = new EmbedBuilder()
            .setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/wrCzESkVzK")
            .setColor(client.config.embedColor)
            .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.songs.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)
            return await m.edit({ embeds: [embed] });
                } else if (b.customId === "playlist_cmd_uwu-stop") {
                    return collector.stop();
                } else if (b.customId === "playlist_cmd_uwu-next")
                    page = page + 1 >= pages.length ? 0 : ++page;
                if (!m) return;
              embed = new EmbedBuilder()
            .setAuthor(`${message.author.username}'s Playlists`, message.author.displayAvatarURL({dynamic: true}), "https://discord.gg/wrCzESkVzK")
            .setColor(client.config.embedColor)
            .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.songs.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)

                return await m.edit({ embeds: [embed] });
            });
        }

    }
};