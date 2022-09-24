module.exports.run = async (client,oldVoice,newVoice, oldState, newState) => {

    if(newVoice.id === client.user.id && !newVoice.serverDeaf) newVoice.setDeaf(true, `Radio Privacy & Policy`);  //!newState.serverDeaf

  
 const player = client.poru.players.get(oldVoice.guild.id);
      if (!player) return;

      if(!newVoice.guild.me.voice.channel){
        player.destroy()
      }
}
