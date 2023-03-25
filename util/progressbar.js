module.exports = {
    progressbar: function (player) {
    let size = 25;
    let line = "▬";
    let slider = "🔘";
    
    if (!player.isPlaying) return `${slider}${line.repeat(size - 1)}]`;
    let current = player.currentTrack.info.length !== 0 ? player.position : player.currentTrack.info.length;
    let total = player.currentTrack.info.length;
    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
   
    if (!String(bar).includes(slider)) return `${slider}${line.repeat(size - 1)}`;
    return `${bar[0]}`;
    }
}//player.currentTrack.info.length