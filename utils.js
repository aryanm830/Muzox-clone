module.exports.run = {
getEmoji: function(amount) {
        let emoji;
        if (amount <= 120) {
            emoji = '🟢';
        } else if (amount <= 800) {
            emoji = '🟡';
        } else {
            emoji = '🔴';
        }
        return emoji;
    }
}