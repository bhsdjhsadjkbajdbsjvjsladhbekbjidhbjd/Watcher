const simplydjs = require("simply-djs")

exports.run =  async(client, message, args) => {
  simplydjs.calculator(message, {
    embedColor: '#075FFF',
    })
    }

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["calculate","calc"],
        permLevel: "User",
        voiceChannel: "false"
      };
      
      exports.help = {
        name: "calculator",
        category: "Miscellaneous",
        description: "Gives you a calculator on a discord channel",
        usage: "calculator"
      };
