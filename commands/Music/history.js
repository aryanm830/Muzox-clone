
const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const load = require('lodash');
const { convertTime } = require('../../util/convert.js');

module.exports = {
    name: "history",
    category: "Music",
    aliases: ["hs"],
    description: "Show the history of your previous songs.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVc: false,
    sameVc: false,
   run: async (client, message, args) => {
  
            var player = client.poru.players.get(message.guild.id);
     
       const queue = player.previousTracks;  
   if(!player) return message.channel.send({ embeds: [new MessageEmbed().setColor(`#ff0000`).setTimestamp().setDescription(`Nothing is playing right now.`)]});
            
            if(!player.previousTracks) return message.channel.send({ embeds: [new MessageEmbed().setColor(`#ff0000`).setTimestamp().setDescription(`Nothing is in your history.`)]});
           
             {
                 
                const queuedSongs = player.get("previoustrack").map(() => `\`${++i}\` • ${t.info.title} • \`[${convertTime(t.info.duration)}]\` • [${t.info.requester}]`);

                const mapping = load.chunk(queuedSongs, 10);
                const pages = mapping.map((s) => s.join("\n"));
                let page = 0;

                if(player.previousTracks.size < 11) {
                    const embed = new MessageEmbed()
                    .setColor(`#ff0000`)
                    .setDescription(`${pages[page]}`)
                    .setTimestamp()
                    .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    
                    .setTitle(`${message.author.username}'s History`)

                    await message.channel.send({
                        embeds: [embed]
                    })
                } else {
                    const embed2 = new MessageEmbed()
                    .setColor(`#ff0000`)
                    .setDescription(`${pages[page]}`)
                    .setTimestamp()
                    .setFooter({ text: `Requested By ${message.author.tag}`, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
                    .setThumbnail(player.currentTrack.info.image)
                    .setTitle(`${message.author.username}'s History`)

                    const but1 = new MessageButton()
                    .setCustomId("queue_cmd_but_1")
                  
                    .setEmoji("⏭")
                    .setStyle("PRIMARY")

                    const but2 = new MessageButton()
                    .setCustomId("queue_cmd_but_2")
                    .setEmoji("⏮")
                    .setStyle("PRIMARY")

                    const but3 = new MessageButton()
                    .setCustomId("queue_cmd_but_3")
                    .setLabel(`${page + 1}/${pages.length}`)
                    .setStyle("SECONDARY")
                    .setDisabled(true)

                    const row1 = new MessageActionRow().addComponents([
                        but2, but3, but1
                    ]);

                    const msg = await message.channel.send({
                        embeds: [embed2],
                        components: [row1]
                    })

                    const collector = message.channel.createMessageComponentCollector({
                        filter: (b) => {
                            if(b.user.id === message.author.id) return true;
                            else {
                                b.reply({
                                    ephemeral: true,
                                    content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`
                                });
                                return false;
                            };
                        },
                        time: 60000*5,
                        idle: 30e3
                    });

                    collector.on("collect", async (button) => {
                        if(button.customId === "queue_cmd_but_1") {
                            await button.deferUpdate().catch(() => {});
                            page = page + 1 < pages.length ? ++page : 0;

                            const embed3 = new MessageEmbed()
                            .setColor(`#ff0000`)
                            .setDescription(`${pages[page]}`)
                            .setTimestamp()
                            .setFooter({ text: `Requested By ${message.author.tag}`, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(player.currentTrack.info.image)
                            .setTitle(`${message.author.username}'s History`)

                            await msg.edit({
                                embeds: [embed3],
                                components: [new MessageActionRow().addComponents(but2, but3.setLabel(`${page + 1}/${pages.length}`), but1)]
                            })
                        } else if(button.customId === "queue_cmd_but_2") {
                            await button.deferUpdate().catch(() => {});
                            page = page > 0 ? --page : pages.length - 1;

                            const embed4 = new MessageEmbed()
                            .setColor(`#ff0000`)
                            .setDescription(`${pages[page]}`)
                            .setTimestamp()
                            .setFooter({ text: `Requested By ${message.author.tag}`, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
                           .setThumbnail(player.currentTrack.info.image)
                            .setTitle(`${message.author.username}'s History`)

                            await msg.edit({
                                embeds: [embed4],
                                components: [new MessageActionRow().addComponents(but2, but3.setLabel(`Page ${page + 1}/${pages.length}`), but1)]
                 }).catch(() => {});
                        } else return;
                    });

                    collector.on("end", async () => {
                        await msg.edit({
                            components: []
                        })
                    });
                }
            }
       }
  };