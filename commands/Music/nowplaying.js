const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { progressbar } = require('../../util/progressbar.js')
//const bar = require("string-progressbar");
const ms = require("ms")
 module.exports = {

    name : "nowplaying",

    description:"shows now playing song",

    aliases: ['np'],

    usage:['np','nowplaying'],

    inVc: true,

    sameVc: true,

    player: true,

    run : async (client,message,args)=> {

let player =  client.poru.players.get(message.guildId);
      const createBar = (total, current, size = 10, line = '<:blackline:947020422577262622>', slider = '\<:greenline:1016174603250434111>') => {
            if (!total) throw new Error('Total value is either not provided or invalid');
            if (!current && current !== 0) throw new Error('Current value is either not provided or invalid');
            if (isNaN(total)) throw new Error('Total value is not an integer');
            if (isNaN(current)) throw new Error('Current value is not an integer');
            if (isNaN(size)) throw new Error('Size is not an integer');
            if (current > total) {
                const bar = slider.repeat(size + 2);
                const percentage = (current / total) * 100;
                return [bar, percentage];
            } else {
                const percentage = current / total;
                const progress = Math.round((size * percentage));
                const emptyProgress = size - progress;
                const progressText = slider.repeat(progress);
                const emptyProgressText = line.repeat(emptyProgress);
                const bar = progressText + emptyProgressText;
                const calculated = percentage * 100;
                return [bar, calculated];
            }
          };
   const em = new EmbedBuilder()

   .setImage(player.currentTrack.info.image)

   .setDescription(`Title: ${player.currentTrack.info.title}\n[\`${ms(player.position)}\`  ${createBar(player.currentTrack.info.length, player.position)[0]}  \`${ms(player.currentTrack.info.length)}\`]`)

   message.channel.send({embeds:[em]})

   

      

}}

