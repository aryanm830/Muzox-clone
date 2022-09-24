const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "lyrics",
    aliases: ["ly"],   
    description: "Displays lyrics for the currently playing song.",
    args: false,
    player: false,
    inVc: false,
    sameVc: false,
   
	 run: async (client, message, args) => {
    let player = client.poru.players.get(message.guild.id);
     if(!player && !args.length)
    return message.channel.send({embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription("There Is Nothing Playing")]})

    if(player && !player.queue && !args.length)
    return message.channel.send({embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription("There Is Nothing Playing")]})

     const m = await message.channel.send({
      embeds: [new MessageEmbed().setColor(client.config.embedColor).setDescription(":mag_right: **Searching...**")],
    });
    let search;
    if(args.length)
    search = args.join(' ');
    else if(!args.length)
    search = player.currentTrack.info.title;

    let url2 = `https://some-random-api.ml/lyrics?title=${encodeURIComponent(${search})}`;
    // get the lyrics
   try {
        let lyrics2 = await fetch(url2).then((res) => res.json());
        if (lyrics2.response !== 200) {
          let noLyrics = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setDescription(`
            <:error:984369648818602005> No lyrics found for \`${search}!\``
            );
          return m.edit({embeds: [noLyrics]});
        } else {
          let embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setTitle(`${lyrics2.full_title}`)
            .setDescription(`\`\`\`nim\n${lyrics2.lyrics.substring(0, 4090)}...\`\`\``);
          return m.edit({ embeds: [embed]});
        }
            let embed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setTitle(`${lyrics.full_title}`)
        .setDescription(lyrics.lyrics);
      return m.edit({ embeds: [embed]});
    } catch (err) {
      let noLyrics = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription(` No lyrics found for \`${search}!\``
        );
      return m.edit({ embeds: [noLyrics]});
    }
   }
}