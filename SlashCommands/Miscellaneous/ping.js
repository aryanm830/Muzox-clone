module.exports = {

name : "ping",
description : "cheking ping of bot",
run : async (client,interaction,args) => {





interaction.reply({content : client.ws.ping + "ms"})
}



}