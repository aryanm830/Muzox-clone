const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

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

   const em = new EmbedBuilder()

   .setImage(player.currentTrack.info.image)

   .setDescription(`Title: ${player.currentTrack.info.title}`)

   message.channel.send({embeds:[em]})

   

      

}}

