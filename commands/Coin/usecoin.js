const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const Topgg = require('@top-gg/sdk')
module.exports = {
  name: "buybadge",
aliases: ['badge'],
   usage: ['buybadge'],
description: "Buy Badge From Coins",
  run: async (client, message, args) => {

    const tf = await client.db.get(`usercoin_${message.author.id}`)
    if(tf > 2){
client.db.set(`badge_${message.author.id}`, true, 86400)
client.db.delete(`usercoin_${message.author.id}`)
        const nikeop = new EmbedBuilder()
        .setAuthor({name: "| Successfully Purchased `Never Delite` Badge", iconURL: message.author.displayAvatarURL()})
        .setDescription("The Profile Badge Will Be Display For Next 24h !")
        .setColor("DarkButNotBlack")
        return message.channel.send({embeds: [nikeop]})
    } else {
        const nikeopi = new EmbedBuilder()
        .setAuthor({name: "| You Don't Have Sufficient Coins ! You need 3 coin to buy a badge", iconURL: message.author.displayAvatarURL()})
        .setColor("DarkButNotBlack")
        return message.channel.send({embeds: [nikeopi]})
    }



  }}


  