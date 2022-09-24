const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "create",
    aliases: ["pl-create"],
    description: "Creates A New Playlist.",
    args: true,
    premium:true,
    usage: "<playlist name>",
    run: async (client, message, args) => {
        let num = await db.find({ UserId: message.author.id});
        const Name = args[0];
        if (Name.length > 10) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription(`<:cross1:853965073383292970> Your Playlist name should be of less than **10** character.`)] });
        };
        let data = await db.find({
            UserId: message.author.id,
            PlaylistName: Name,
        });

        if(num.length === 5){
          return message.reply({embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription("You Can Create Maximum **5** Playlists.")]})
           
        }
        
        

        if (data.length > 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.config.embedColor).setDescription("Playlist Already Exists.")] })
        };
        let userData = db.find({
            UserId: message.author.id
        });

        const newData = new db({
            UserName: message.author.tag,
            UserId: message.author.id,
            PlaylistName: Name,
            CreatedOn: Math.round(Date.now() / 1000)
        });
        await newData.save();
        const embed = new EmbedBuilder()
            .setDescription(`<:success:984369679080509450> Playlist Created **${Name}**`)
            .setColor(client.config.embedColor)
        return message.channel.send({ embeds: [embed] })

    }
};