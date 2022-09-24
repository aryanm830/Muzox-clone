
const User = require("../../Models/User");
const moment = require("moment");
const { Collection, MessageEmbed } = require("discord.js");

module.exports = {
  // options
  name: "premiumlist",
  description: `get list of all preimium user`,
  
  // command start
  run: async (client, interaction, args) => {
    // Code
    if (interaction.user.id !== "884067115110395925")
      return interaction.reply({content: `You are not my Owner`});

    let data = client.userSettings
      .filter((data) => data.isPremium === true)
      .map((data, index) => {
        return ` <@${data.Id}> Expire At :- \`${moment(
          data.premium.expiresAt
        ).format("dddd, MMMM Do YYYY")}\` Plan :- \`${data.premium.plan}\` `;
      });
    interaction.reply({
      embeds: [
        new MessageEmbed().setDescription(
          data.join("\n") || "No Premium User Found"
        ),
      ],
    });
  },
}