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
        `Poru Music`,'Muzox Cloning...'
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "LISTENING" });
    }, 60000);
    
}