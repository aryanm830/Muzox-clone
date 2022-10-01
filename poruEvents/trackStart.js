const discord = require("discord.js")
 const { ButtonBuilder, ActionRowBuilder } = require("discord.js")
const ms = require("ms")
module.exports.run = async (client,player,track) => {
  
let tr = track.info.title;
  let result = tr;
  const embed = new discord.EmbedBuilder()
    .setAuthor({name:`Now Playing`,iconURL:client.user.displayAvatarURL()})
.setColor(client.config.embedColor) 

    .setDescription(`[${result}](${track.info.uri}) ${track.info.requester}`)

  const pause = new ButtonBuilder().setCustomId("pause").setEmoji("1023159510581379082").setStyle("Secondary");
  const rewind = new ButtonBuilder().setCustomId("rewind").setEmoji("1023159244943536218").setStyle("Secondary");

   const loop = new ButtonBuilder().setCustomId("loop").setEmoji("1021424527424626718").setStyle("Secondary");
    
   const forward = new ButtonBuilder().setCustomId("forward").setEmoji("1021424525281337344").setStyle("Secondary");

   const previous = new ButtonBuilder().setCustomId("previous").setEmoji("1023159828643840022").setStyle("Secondary");

   const skip = new ButtonBuilder().setCustomId("skip").setEmoji("1023159160604463134").setStyle("Secondary");

  const shuffle = new ButtonBuilder().setCustomId("shuffle").setEmoji("1021424524023050250").setStyle("Secondary");

  const stop = new ButtonBuilder().setCustomId("stop").setEmoji("1021424526606737459").setStyle("Secondary");
  const queue = new ButtonBuilder().setCustomId("queue").setEmoji("1023160060802768966").setStyle("Secondary");
 
   const row = new ActionRowBuilder().addComponents(previous,rewind,pause,forward,skip);
   const row1 = new ActionRowBuilder().addComponents(loop,shuffle,queue,stop);
   const channel = client.channels.cache.get(player.textChannel)
return channel?.send({ embeds: [embed], components: [row, row1] }).then(x => player.message = x)

}