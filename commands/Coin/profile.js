const { EmbedBuilder, Embed } = require("discord.js");
const { readdirSync } = require("fs");
const Topgg = require('@top-gg/sdk')
module.exports = {
  name: "profile",
aliases: ['pf'],
   usage: ['profile'],
description: "Show Profile",
  run: async (client, message, args) => {

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const db = await client.db.get(`usercoin_${user.id}`)
let coin = db;
if(db === null) coin = "0"
const aayan = await client.db.get(`badge_${user.id}`)
let abc = "";
if(aayan === true) abc = "Never Delite"  // You can add emoji also here !
if(aayan === null) abc = "No Badge Found"
const embed = new EmbedBuilder()
.setAuthor({name: `| Profile`, iconURL: user.displayAvatarURL()})
.addFields(
    { name: 'Badge', value: `${abc}`, inline: false },
    { name: 'Total Coins', value: `${coin}`, inline: false },
)
.setColor("DarkButNotBlack")
.setThumbnail(user.displayAvatarURL())

message.channel.send({embeds: [embed]})

  }}