const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { convertTime }= require('../util/convert');
const User = require("../Models/User");
module.exports.run = async (client, interaction, args) => {
  const music = new EmbedBuilder();
  music.setFooter({text:`Requested by ${interaction.user.tag}`})
  const embed = new EmbedBuilder();
  const premrow = new ActionRowBuilder()
     .addComponents(new ButtonBuilder()
     .setLabel("Premium")
     .setStyle("Link")
     .setURL("https://discord.gg/wrCzESkVzK"),
     new ButtonBuilder()
     .setLabel("Vote")
     .setStyle("Link")
     .setEmoji("985926662552178748")
     .setURL("https://top.gg/"));
        
     music.setColor(client.config.embedColor)
const player = client.poru.get(interaction.guild.id);
if(interaction.isButton()) {
  if(interaction.customId === 'pause')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
            
   const pause = new ButtonBuilder().setCustomId("pause").setEmoji(!player.isPaused ?  "1021424523146444821" : "1023159510581379082").setStyle(!player.isPaused ? "Success" : "Secondary" );
   const rewind = new ButtonBuilder().setCustomId("rewind").setEmoji("1023159244943536218").setStyle("Secondary");

   const loop = new ButtonBuilder().setCustomId("loop").setEmoji("1021424527424626718").setStyle("Secondary");
    
   const forward = new ButtonBuilder().setCustomId("forward").setEmoji("1023159160604463134").setStyle("Secondary");

   const previous = new ButtonBuilder().setCustomId("previous").setEmoji("1023159828643840022").setStyle("Secondary");

   const skip = new ButtonBuilder().setCustomId("skip").setEmoji("1021424525281337344").setStyle("Secondary");

  const shuffle = new ButtonBuilder().setCustomId("shuffle").setEmoji("1021424524023050250").setStyle("Secondary");

  const stop = new ButtonBuilder().setCustomId("stop").setEmoji("1021424526606737459").setStyle("Secondary");
  const queue = new ButtonBuilder().setCustomId("queue").setEmoji("1023160060802768966").setStyle("Secondary");

   
   
  const row = new ActionRowBuilder().addComponents(previous,rewind,pause,forward,skip);
  const row1 = new ActionRowBuilder().addComponents(loop,shuffle,queue,stop);
   
  try{
    player.message?.edit({components: [row, row1]})
  }catch(e) {
}
           player.pause(!player.isPaused);
                const Text = player.isPaused ? "⏸️ Paused" : "▶️ Resumed";
               
             music.setDescription(`**${Text} the player**`)
              
              interaction.reply({embeds: [music]});
         }
         else{
         music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
          interaction.reply({embeds:[music]})
        }
       } // "pause" work above 
       if(interaction.customId === 'skip')
       {
         if(!player)
         {
          interaction.reply({content: '<:error:984369648818602005> Please Play Something'})
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
           interaction.reply({content: 'please play something'})
         }
         if(interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
           await player.stop();
                music.setDescription(`Skipped to the next track.`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else{
         music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
          interaction.reply({embeds:[music],ephemeral:true})
        }
       }// "skip work above"  
       if(interaction.customId === 'stop')
       {
         if(!player)
         {
          interaction.reply({content: 'please play something'})
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
          interaction.message.delete();
         }
         if(interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.stoped)
                {
                  player.stop(true)
                music.setDescription(`**🛑 Stopped The Player**`)
                interaction.reply({embeds: [music]});
                }
                else
                {
                  music.setDescription(`**The Music Is Already Stopped**`)
                interaction.reply({embeds: [music]});
                }
             {
           return interaction.message.delete();
             }
         }
         else{
         music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
          interaction.reply({embeds:[music],ephemeral:true})
        }
       }// "stop" work above    player.trackRepeat && !player.queueRepeat
         
         if(interaction.customId === 'loop')
       {
        if(!player)
        {
          return interaction.message.delete();
        }/* end of not player */
        if(!player.message || interaction.message.id != player.message?.id)
        {
          return interaction.message.delete();
        }
        if(interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
          if (player.loop === 'TRACK') {
            player.setLoop('TRACK');
            music.setDescription(`**Now looping the current track...**`)
          interaction.reply({embeds: [music]});
          } else if (player.loop === 'QUEUE') {
            player.setLoop('QUEUE');
            music.setDescription(`**Now looping the queue...**`)
                interaction.reply({embeds: [music]});
          } else if (player.loop === 'NONE') {
            player.setLoop('NONE');
            music.setDescription(`**Looping is now disabled**`)
            interaction.reply({embeds: [music]});
          }
         
      }  
      else{
       music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({embeds:[music],ephemeral:true})
      }
       }
         
       if(interaction.customId === 'shuffle')
       {
         if(!player)
         {
          interaction.reply({content: 'please play something'})
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.queue[3])
           {
             music.setDescription(`Queue length must be greater than 3`)
             return interaction.reply({embeds: [music]});
           }
           else 
           {
              
              player.queue.shuffle();
              music.setDescription(`Shuffled the queue`)
              interaction.reply({embeds: [music]});
           }
         }
         else{
         music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
          interaction.reply({embeds:[music],ephemeral:true})
        }
       }
       if(interaction.customId === 'rewind')
       {
        if(!player)
        {
          return interaction.message.delete();
        }/* end of not player */
        if(!player.message || interaction.message.id != player.message?.id)
        {
          return interaction.message.delete();
        }
        if(interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
          player.seekTo(player.position-10000);
    music.setDescription(`Rewinded To ${(convertTime(player.position-10000))}`)
         }  
        else{
          music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
           interaction.reply({embeds:[music],ephemeral:true})
         }
        
       }
       if(interaction.customId === 'forward')
       {
        if(!player)
        {
          return interaction.message.delete();
        }/* end of not player */
        if(!player.message || interaction.message.id != player.message?.id)
        {
          return interaction.message.delete();
        }
        if(interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId)
         {
          player.seekTo(player.position+10000);
    music.setDescription(`Forwaded To ${(convertTime(player.position+10000))}`)
         }  
        else{
          music.setDescription(`🚫 You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
           interaction.reply({embeds:[music],ephemeral:true})
         }
        
       }

    }


}