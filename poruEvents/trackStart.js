const discord = require("discord.js")
 const { MessageButton, MessageActionRow } = require("discord.js")
const ms = require("ms")
module.exports.run = async (client,player,track) => {
let tr = track.info.title;
  let result = tr.substring(0, 64);
  const embed = new discord.MessageEmbed()
    .setAuthor(`Now Playing`)
.setColor(client.config.embedColor) 

    .setDescription(`[${result}](${track.info.uri}) [<@${track.info.requester.id}>]`)

  const But3 = new MessageButton().setCustomId("pause").setLabel("Pause").setStyle("SECONDARY");

   const But4 = new MessageButton().setCustomId("loop").setLabel("Loop").setStyle("SECONDARY");
    


   

   const But8 = new MessageButton().setCustomId("skip").setLabel("Skip").setStyle("SECONDARY");

  const But9 = new MessageButton().setCustomId("shuffle").setLabel("Shuffle").setStyle("SECONDARY");

  const But10 = new MessageButton().setCustomId("stop").setLabel("Stop").setStyle("DANGER");
 
   const row = new MessageActionRow().addComponents(But3, But8, But4, But9, But10);
   const channel = client.channels.cache.get(player.textChannel)
return channel?.send({ embeds: [embed], components: [row]}).then(x => player.message = x)

}