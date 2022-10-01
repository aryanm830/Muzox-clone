module.exports.run = async (client,oldVoice,newVoice, oldState, newState) => {

    if(newVoice.id === client.user.id && !newVoice.serverDeaf) newVoice.setDeaf(true);  //!newState.serverDeaf

  
 const player = client.poru.players.get(oldVoice.guild.id);
      if (!player) return;

      if(!newVoice.guild.members.me.voice.channel){
        player.destroy()
      }
}
