const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
module.exports = {
  name: "help",
aliases: ['h'],
   usage: ['h','help'],
description: "Gives My All command info",
  run: async (client, message, args) => {
    let prefix = await client.db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = client.prefix;


    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

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

      const embed = new EmbedBuilder()
        .setAuthor({name:"Muzox Commands", iconURL: client.user.displayAvatarURL()})
        .setDescription(`• My Prefix For This Server is ${prefix}\n❗ Alert From Developers`)
        .addFields(categories)

        .setFooter({text: `Type ${prefix}help <command name> for more information  on a command!`})
        
        .setColor(client.config.embedColor);
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)

          .setColor(client.config.embedColor);
        return message.channel.send({embeds: [embed]});
      }

      const embed = new EmbedBuilder()
        .setTitle("Command: " + args[0])
      
        .addField(
          "Name:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`=${command.name} ${command.usage}\``
            : `\`=${command.name}\``
        )
        .addField(
          "Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
     
        .setColor(client.config.embedColor);
      return message.channel.send({embeds:[embed]});
    }

  }
}
