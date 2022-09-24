const { MessageEmbed } = require("discord.js");
const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { readdirSync } = require("fs");
module.exports = {
  name: "help",
description: "Gives My All command info",
options: [{
    name: 'command',
    type: ApplicationCommandOptionType.String,  
    description: 'Help About This Command',
    required: false,
  }],

  run: async (client, interaction, args) => {
    let prefix = "/";

    if (!interaction.options.getString('command')) {
      let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir,
          value: cmds.length === 0 ? "UNKNOWN" : cmds.join(", "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setAuthor("SlashCommands", client.user.displayAvatarURL())
        .setDescription(`• My Prefix For This Server is ${prefix}\n• For Command info Use ${prefix}help [command]\n• A new alert have arrived type ${prefix}alert to see it`)
        .addFields(categories)

        .setFooter(`Type ${prefix}help <command name> for more information  on a command!`)
        
        .setColor(client.config.embedColor);
      return interaction.reply({ embeds: [embed] });
    } else {
      const command =
        client.slash.get(interaction.options.getString('command').toLowerCase());

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my SlashCommands!`)

          .setColor(client.config.embedColor);
        return interaction.reply({embeds: [embed]});
      }

      const embed = new MessageEmbed()
        .setTitle("Command: " + interaction.options.getString('command'))
      
        .addField(
          "Name:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        
        .addField(
          "Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
     
        .setColor(client.config.embedColor);
      return interaction.reply({embeds:[embed]});
    }

  }
}