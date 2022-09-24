const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "jump",
  description: "Jumps the player!",
  inVc: true,
  sameVc: true,
  options:  [{
    name: 'from',
    type: ApplicationCommandOptionType.Number,  
    description: 'jumps From',
    required: true,
  },
  {
    name: 'to',
    type: ApplicationCommandOptionType.Number,  
    description: 'jumps to',
    required: true,
  }],
  
  run: async (client, interaction, args) => {
    
    function moveArrayElement(arr, fromIndex, toIndex) {
        arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
        return arr;
    }
    
   let player = client.poru.players.get(interaction.guild.id)

   const position = Number(interaction.options.getNumber('from'));
    
  const from = interaction.options.getNumber('from') ? parseInt(interaction.options.getNumber('from'), 10) : null;
  const to = interaction.options.getNumber('to') ? parseInt(interaction.options.getNumber('to'), 10) : null;
     
    if (from === null || to === null)
        return interaction.reply(`invaild usage \n jump 10 1`)

        if (from === to || (isNaN(from) || from < 1 || from > player.queue.length) || (isNaN(to) || to < 1 || to > player.queue.length))
        return interaction.reply('that number is out of queue length')
    

const moved = player.queue[from - 1];
moveArrayElement(player.queue, from - 1, to - 1)
    
    return interaction.reply({ embeds: [{
      color: client.config.embedColor,
      description: `${moved.info.title} moved to \`${to}\``
    }]})
  }
} // try it 