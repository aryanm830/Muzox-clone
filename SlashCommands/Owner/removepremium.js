
const moment = require("moment");
const schema = require("../../Models/code");
const User = require("../../Models/User");

module.exports = {
  // options
  name: "removepremium",
  description: `remove premium from user`,
  options: [
    {
      name: "user",
      description: `mention a premium user`,
      type: "USER",
      required: true,
    },
  ],
  // command start
  run: async (client, interaction, args) => {
    // Code
    let user = interaction.options.getUser("user");
    let data = client.userSettings.get(user.id);
    if (!data.isPremium) {
      return interaction.reply({content: `${user} is Not a Premium User`});
    } else {
      await User.findOneAndRemove({ Id: user.id });
      await client.userSettings.delete(user.id);
      interaction.reply({content: `${user} Removed From Premium`});
    }
  },
}
