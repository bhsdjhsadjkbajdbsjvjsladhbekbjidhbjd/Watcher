const Discord = require("discord.js");
require("dotenv");

exports.run =  async (client, message, args) => {
      let data = [];
      client.guilds.cache.forEach((x) => {
        message.channel.send(
          `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`
        );
      });

      if (data.length > 0) {
        data.sort();
        data = `🔹 ` + data.join("\n🔹");
      } else {
        data = "[No server found]";
      }
    }

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["serverlist"],
        permLevel: "Bot Admin",
      voiceChannel: "false"
      };
      
      exports.help = {
        name: "botservers",
        category: "System",
        description: "Gives out the list of servers the bot is in.",
        usage: "botservers"
      };

