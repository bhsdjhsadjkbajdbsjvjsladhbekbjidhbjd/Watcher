const logger = require("../modules/logger.js");
module.exports = async (client, error) => {
  const channel = client.channels.cache.get(config.errorlogs);

  channel.send(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
  logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
