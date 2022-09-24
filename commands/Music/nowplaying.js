const { MessageEmbed, MessageAttachment } = require("discord.js");
let canvafy = require ("canvafy");

 module.exports = {
    name : "nowplaying",
    description:"shows now playing song",
    aliases: ['np'],
    usage:['np','nowplaying'],
    inVc: true,
    sameVc: true,
    player: true,
    run : async (client,message,args)=> {
let player =  client.poru.players.get(message.guildId)
    const spotify = await new canvafy.Spotify()
    .setAuthor(player.currentTrack.info.author)
    .setAlbum("World")
    .setBackground("image", "https://cdn.discordapp.com/attachments/968080152640757762/1000017925362696282/img.jpg")
    .setImage(player.currentTrack.info.image)
.setTimestamp(player.position,  player.currentTrack.info.length)
      .setTitle(player.currentTrack.info.title)
    .build();
      const attachment = new MessageAttachment(spotify.toBuffer(), 'nowplaying.png')
      const embed = {
        title:"Now Playing",
        color: client.config.embedColor,
        image: {
          url:`attachment://nowplaying.png`
        }
      };
      
    message.channel.send({
      embeds: [embed],
   files: [{
        attachment: spotify.toBuffer(),
        name: `nowplaying.png`
      }]});


      
}}
