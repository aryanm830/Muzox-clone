
const { Client, Message, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const load = require('lodash');
const { convertTime } = require('../../util/convert.js');

module.exports = {
    name: "queue",
   
    aliases: ["q"],
    description: "Show the music queue and now playing.",
  
    owner: false,
    player: true,
    inVc: false,
    sameVc: false,
   run: async (client, message, args, prefix) => {
  
            let player = client.poru.players.get(message.guild.id)
       const queue = player.queue;  
   if(!player) return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setTimestamp().setDescription(`Nothing is playing right now.`)]});
            
            if(!player.queue) return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setTimestamp().setDescription(`Nothing is playing right now.`)]});
           
            if(player.queue.length === "0" || !player.queue.length) {
                const embed = new EmbedBuilder()
                .setColor(client.config.embedColor)
                .setDescription(`Now Playing:\n [${player.currentTrack.info.title}](${player.currentTrack.info.uri}) - \`[${convertTime(player.currentTrack.info.duration)} left]\``)

                await message.channel.send({
                    embeds: [embed]
                }).catch(() => {});
            } else {
                const queuedSongs = player.queue.map((t, i) => `${i})〢 [${t.info.title}](${t.info.uri}) • \`[${convertTime(t.info.duration)}]\``);

                const mapping = load.chunk(queuedSongs, 10);
                const pages = mapping.map((s) => s.join("\n"));
                let page = 0;

                if(player.queue.size < 11) {
                    const embed = new EmbedBuilder()
                    .setColor(client.config.embedColor)
                    .setDescription(`**Now playing**\n<:emoji_66:975646921752449074> [${player.currentTrack.info.title}](${player.currentTrack.info.uri})\n<:emoji_69:970264635028680784> Author: ${player.currentTrack.info.author}\n<:emoji_70:970265771387281418> Requested by: ${player.currentTrack.info.requester.username}\n<:emoji_65:975642252942651413> Duration: \`\n\n🔊 Upcoming Songs\n${pages[page]}`)
                    
                    .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    
                    .setAuthor({name:`Music Queue`,iconURL:client.user.displayAvatarURL({dynamic: true})})

                    await message.channel.send({
                        embeds: [embed]
                    })
                } else {
                    const embed2 = new EmbedBuilder()
                    .setColor(client.config.embedColor)
                    .setDescription(`**Now playing**\n<:emoji_66:975646921752449074> [${player.currentTrack.info.title}](${player.currentTrack.info.uri})\n<:emoji_69:970264635028680784> Author: ${player.currentTrack.info.author}\n<:emoji_70:970265771387281418> Requested by: ${player.currentTrack.info.requester.username}\n<:emoji_65:975642252942651413> Duration: \`\n\n🔊 Upcoming Songs\n${pages[page]}`)
                    
                    .setFooter({
                      text: `Page ${page + 1}/${pages.length}`
                    })
                    
                    .setAuthor({name:'Music Queue',iconURL:client.user.displayAvatarURL({dynamic: true})})
                    

                    const but1 = new ButtonBuilder()
                    .setCustomId("queue_cmd_but_1")
                  
.setLabel("Next Page")                    .setEmoji("973804130663555102")
                    .setStyle(ButtonStyle.Secondary)

                    const but2 = new ButtonBuilder()
                    .setCustomId("queue_cmd_but_2")
                    
.setLabel("Prev Page")
                    .setEmoji("973804190080061492")
                    .setStyle(ButtonStyle.Secondary)

                    const but3 = new ButtonBuilder()
                    .setCustomId("queue_cmd_but_3")
                    .setLabel(`${page + 1}/${pages.length}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)

                    const row1 = new ActionRowBuilder().addComponents([
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
                        }
                    });

                    collector.on("collect", async (button) => {
                        if(button.customId === "queue_cmd_but_1") {
                            await button.deferUpdate().catch(() => {});
                            page = page + 1 < pages.length ? ++page : 0;

                            const embed3 = new EmbedBuilder()
                            .setColor(client.config.embedColor)
                            .setDescription(`**Now Playing**\n<:emoji_66:975646921752449074> [${player.currentTrack.info.title}](${player.currentTrack.info.uri})\n<:emoji_69:970264635028680784> Author: ${player.currentTrack.info.author}\n<:emoji_70:970265771387281418> Requested by: ${player.currentTrack.info.requester.username}\n<:emoji_65:975642252942651413> Duration: \`${convertTime(player.currentTrack.info.duration)}\`\n\n**Coming up...**\n${pages[page]}`)
                            
                            .setFooter(`Page ${page + 1}/${pages.length}`)
                            
                    .setAuthor({name:'Music Queue',iconURL:client.user.displayAvatarURL()})
                            

                            await msg.edit({
                                embeds: [embed3],
                                components: [new ActionRowBuilder().addComponents(but2, but3.setLabel(`${page + 1}/${pages.length}`), but1)]
                            })
                        } else if(button.customId === "queue_cmd_but_2") {
                            await button.deferUpdate().catch(() => {});
                            page = page > 0 ? --page : pages.length - 1;

                            const embed4 = new EmbedBuilder()
                            .setColor(client.config.embedColor)
                            .setDescription(`**Now playing**\n<:emoji_66:975646921752449074> [${player.currentTrack.info.title}](${player.currentTrack.info.uri})\n<:emoji_69:970264635028680784> Author: ${player.currentTrack.info.author}\n<:emoji_70:970265771387281418> Requested by: ${player.currentTrack.info.requester.username}\n<:emoji_65:975642252942651413> Duration: \`${convertTime(player.currentTrack.info.duration)}\`\n\n**Coming up...**\n${pages[page]}`)
                            
                            .setFooter(`Page ${page + 1}/${pages.length}+`)
                           
                                                .setAuthor({name:'Music Queue',iconURL:client.user.displayAvatarURL()})


                            await msg.edit({
                                embeds: [embed4],
                                components: [new ActionRowBuilder().addComponents(but2, but3.setLabel(`Page ${page + 1}/${pages.length}`), but1)]
                 }).catch(() => {});
                        } else return;
                    });

                    
                }
            }
       }
  };