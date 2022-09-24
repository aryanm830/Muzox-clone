const User = require("../Models/User");
module.exports.run = async (client) => {
 
  client.poru.init(client)
  client.logger.log(`${client.user.username} is ready with ${client.guilds.cache.size} server`);

  

client.db.on("ready", () => {     client.logger.log("DB READY");
});
    client.db.on("err", err => {
        
    })

await client.db.connect();
    
  

 
    setInterval(() => {
      const statuses = [
        `World Music`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "LISTENING" });
    }, 60000);
    const users = await User.find();
    for (let user of users) {
      client.userSettings.set(user.Id, user);
    }
  
    require('../handlers/premium')(client)
}