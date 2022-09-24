const { MessageEmbed } = require("discord.js");
const { TrackUtils, Player } = require("poru");
const playlists = require("../../schema/playlist");

module.exports = {
    name: "load",
    aliases: ["pl-load"],
    description: "Loads All Song Of Playlist To Queue.",
    args: true,
    usage: "<playlist name>",
    player: false,
    inVc: true,
    sameVc: true,
    premium:true,
    run: async (client, message, args) => {

       try {

            const playlistName = args.join(' ').replace(/_/g, ' ');


            playlists.findOne({
              PlaylistName: playlistName,
                UserId: message.author.id,
            }, async (err, p) => {
                if (!p) {
                    return message.channel.send(`I was unable to find that playlist in your profile`);
                }

                let player = client.poru.players.get(message.guild.id)
        if(!player){
         player = await client.poru.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeaf: true,
          })
        }
   


              const tracks =  p.songs;
         const m = await message.reply({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<a:m_loading:1015561059786047558> Started loading **${p.songs.length}** Tracks from Playlist **${playlistName}**`)]})
             
                for (let i = 0; i <= p.songs.length; i++) {

                    if (tracks[i]) {
                        let search = await client.poru.spotify.fetch(tracks[i].title)
                        if (!search || !search.tracks.length) continue;
                        const track = search.tracks.shift()

                        track.info.requester = message.author;
     
                        player.queue.add(track)
                    }
                    if(!player.isPlaying) player.play();
               

                
                }
await m.edit({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<:success:984369679080509450> Loaded **${p.songs.length}** Tracks from Playlist **${playlistName}**`)]})
            });

        } catch (e) {
            m.edit({ embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(`<:error:984369648818602005> Can't load tracks from Playlist **${playlistName}**`)]})
           console.log(e)
        }


    }
};