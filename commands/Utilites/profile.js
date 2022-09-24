const { EmbedBuilder, version, ActionRowBuilder, ButtonBuilder, Message } = require("discord.js");



module.exports = {

name : "profile",
 description: "Show the user's profile",
    args: false,
    aliases: ["badge", "badges", "achievement", "achievements"],
    usage: ["badge", "badges", "achievement", "achievements"],
run : async (client,message,args) => {

 const user =  message.mentions.users.first() || message.author;
      
      const aj = user.id === "884067115110395925" ? true : false;
      const aj1 = user.id === "889005501701029919" ? true : false;
      let badges = "";
     
      const guildd = await client.guilds.fetch("805734218122264606"); 
      const sus = await guildd.members.fetch(user.id).catch((e) => {
      
      });
      if(aj === true || aj1 === true  || user.id === "889005501701029919"  || user.id === "884067115110395925") badges = badges + `\n<:owner:979635607141756978> **Owner**`;
try{
      const own = sus.roles.cache.has("920657484585250827");
      if(own === true) badges = badges+`\n<:dev:978563383580295188>  **Developers**`;

      const supp = sus.roles.cache.has("920657485298270209");
      if(supp === true) badges = badges + `\n<:staff:984369673715982378> **Staff**`;

      const mod = sus.roles.cache.has("920657486409768961");
      if(mod === true) badges = badges + `\n<:mod:984369659094654996> **Moderator**`;

	  

      const bug = sus.roles.cache.has("979644017807597568");
      if(bug === true) badges = badges + `\n<:bug:984369647040204820> **Bug Hunter**`;

      const supo = sus.roles.cache.has("920657496182521856");
      if(supo === true) badges = badges + `\n<:early:978563383479636019> **Supporter**`;

      const frn = sus.roles.cache.has("920657495427538974");
      if(frn === true) badges = badges + `\n<:friends:984372535862919188> **Close Friend**`;

}catch(err){
 if(badges === "") badges = "`No Badge Available`";
}

      const row = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL(`https://discord.gg/wrCzESkVzK`)
			);
      const embed = new EmbedBuilder()
      .setAuthor(`${client.user.username}'s Profile For ${user.username}#${user.discriminator}`, client.user.displayAvatarURL({dynamic: true}), "https://discord.gg/eYdCRGqrnY")
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .setColor(`${client.config.embedColor}`)
      .addField(`**__${client.user.username} Achievements__**`, `${badges ? badges : "`No Badge Available`"}`)
      
 .setTimestamp();

      
      message.channel.send({embeds: [embed],components: [row]})




}



}