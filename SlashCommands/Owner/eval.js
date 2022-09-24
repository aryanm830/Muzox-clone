const {
    MessageEmbed,MessageActionRow,MessageButton, MessageAttachment
    } = require("discord.js");
    const {
    inspect
    } = require("util");

    module.exports = {
        name: "eval",
        description: "evaluates a given code [owner only]",
        options: [{
            name: "code",
            description: "type a code to execute",
            type: 3,
            required: true
    }],
    run: async (client, interaction, args) => {
const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setEmoji("993492852023762965")
    .setCustomId('DELETE_BUT')
    .setStyle("DANGER"));
        const nembed = new MessageEmbed()
            .setColor(`${client.config.embedColor}`)
            .setTitle("EVAL")
            .setDescription("<:error:984369648818602005> You are not allowed to run this command! Only the Owners are allowed to run this command!")            
            .setFooter(interaction.member.user.tag)

        if (!client.config.owner.includes(interaction.member.user.id)) return interaction.reply({
            embeds: [nembed]
        });

        let toEval = interaction.options.getString("code")


        try {
            const embed = new MessageEmbed()    
                .setColor(`${client.config.embedColor}`)
                .setTitle("EVAL")
                .setDescription("❌ Error: `Cannot evaluate nothing`")
                .setFooter(interaction.member.user.tag)
            let evaluated = inspect(eval(toEval, {
                depth: 0
            }))
            if (!toEval) return interaction.reply({
                embeds: [embed], components: [row]
            });
           const str = evaluated;
            const file = new MessageAttachment(Buffer.from(str, "utf-8"), `${client.user.username} + '.js'`)

            if (evaluated.length > 1024) return interaction.reply({files: [file], components: [row]});


            let hrDiff = process.hrtime(process.hrtime());
            const embed2 = new MessageEmbed()              
                .setColor(`${client.config.embedColor}`)
                .setTitle("EVAL")
                .setDescription(`\`\`\`js\n${evaluated}\n\`\`\``)
                .setFooter(interaction.member.user.tag)
            interaction.reply({
                embeds: [embed2], components: [row]
            })
        } catch (e) {
            interaction.reply({
                content: `An error occurred : \`${e.message}\``
            });
        }

    }
}