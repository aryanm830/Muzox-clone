const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const Topgg = require('@top-gg/sdk')
module.exports = {
  name: "claimcoin",
aliases: ['cc'],
   usage: ['claimcoin','cc'],
description: "Get Premium Coin After Voting Me !",
  run: async (client, message, args) => {
try {
const tf = await client.db.get(`usercoin_${message.author.id}`)
const edate = await client.db.get(`date_${message.author.id}`)
const vote = await client.topgg.hasVoted(message.author.id)
const cdate = new Date().getDate()

if(tf <3){
if(vote){
if(cdate === edate){
  return message.channel.send("You Can Only Claim 1 coin in a day , Come Back After 24h")
}
const date = new Date().getDate()
await client.db.set(`date_${message.author.id}`, date, 86400)
    await client.db.add(`usercoin_${message.author.id}`, 1)
    
    const messagek = new EmbedBuilder()
    .setAuthor({name: `| Added 1 Premium Coin`, iconURL: message.author.displayAvatarURL()})
    .setColor("DarkButNotBlack")
    return message.channel.send({embeds: [messagek]})
} else {
    message.reply(`To Use These Command Kindly Vote Me First !`)
}
} else {
  message.reply(`To get more coin ! First Use All Coins ! `)
}


} catch(err){
  message.reply("Something Went Wrong")
}
  }}