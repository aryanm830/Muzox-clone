const discord = require("discord.js")
 const { ButtonBuilder, ActionRowBuilder } = require("discord.js")
const ms = require("ms")
module.exports.run = async (client,player,track) => {
let tr = track.info.title;
  let result = tr;
  const embed = new discord.MessageEmbed()
    .setAuthor({name:`Now Playing`,iconURL:client.user.displayAvatarURL})
.setColor(client.config.embedColor) 

    .setDescription(`[${result}](${track.info.uri}) <@${track.info.requester.id}>`)

  const pause = new ButtonBuilder().setCustomId("pause").setLabel("").setEmoji("1023159510581379082").setStyle("SECONDARY");

   const loop = new ButtonBuilder().setCustomId("loop").setLabel("").setEmoji("1021424527424626718").setStyle("SECONDARY");
    
   const forward = new ButtonBuilder().setCustomId("forward").setLabel("").setEmoji("1021424525281337344").setStyle("SECONDARY");

   const previous = new ButtonBuilder().setCustomId("previous").setLabel("").setEmoji("1023159828643840022").setStyle("SECONDARY");

   const skip = new ButtonBuilder().setCustomId("skip").setLabel("").setEmoji("1023159160604463134").setStyle("SECONDARY");

  const shuffle = new ButtonBuilder().setCustomId("shuffle").setLabel("").setEmoji("1021424524023050250").setStyle("SECONDARY");

  const stop = new ButtonBuilder().setCustomId("stop").setLabel("").setEmoji("1021424526606737459").setStyle("SECONDARY");
  const queue = new ButtonBuilder().setCustomId("queue").setLabel("").setEmoji("1023160060802768966").setStyle("SECONDARY");
 
   const row = new ActionRowBuilder().addComponents(previous,rewind,pause,forward,skip);
   const row1 = new ActionRowBuilder().addComponents(loop,shuffle,queue,stop);
   const channel = client.channels.cache.get(player.textChannel)
return channel?.send({ embeds: [embed], components: [row] [row1] }).then(x => player.message = x)

}