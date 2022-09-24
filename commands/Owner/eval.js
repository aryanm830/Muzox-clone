const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

const { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  description:"evaluates the given code",
  aliases:['ev'],
  owner:true,
  run: async (client, message, args) => {
 const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setEmoji("993492852023762965")
    .setCustomId('DELETE_BUT')
    .setStyle("DANGER"));

     const player = client.poru.players.get(message.guild.id)

      const em1 = new MessageEmbed();
      const nembed = new MessageEmbed()
      .setColor(`${client.config.embedColor}`)
      .setTitle("EVAL")
      .setDescription("<:error:984369648818602005> You are not allowed to run this command! Only the Owners are allowed to run this command!")            
      .setFooter(message.author.tag)
  
  if (!client.config.owner.includes(message.author.id)) return message.channel.send({
      embeds: [nembed]
  });
        
      

       let a = "";

        try {
            const code = args.join(" ");
            if (!code) return  message.channel.send({content: `\`\`\`js\nundefined\`\`\``, components: [row]});
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "No, shut up, what will you do it with the token?";
            } else {
                evaled = await eval(code);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
                            const str = output;
            const file = new MessageAttachment(Buffer.from(str, "utf-8"), 'World.js')
            return await message.channel.send({files: [file], components: [row]}) 
              
            } else {
                a += "```js\n" + output + "```";
            }

            message.channel.send({content: `${a}`, components: [row]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                         const str = err;
            const file = new MessageAttachment(Buffer.from(str, "utf-8"), 'world_error.js')
            return await message.channel.send({files: [file], components: [row]})
            } else {
                a += "```js\n" + err + "```";
            }

             message.channel.send({content: `${a}`, components: [row]});
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}