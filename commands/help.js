const Discord = module.require("discord.js");
const { getSettings } = require("../modules/functions.js");

exports.run = async (client, message, args) => {
  const settings = message.settings = getSettings(message.guild);
        
        const userlol = new Discord.MessageEmbed()
        .setTitle("Watcher Support")
        .setDescription(`The Watcher's Prefix for this server is \`${settings.prefix}\` \n
         **Help & Support** \n [Commands](https://www.watcherdiscord.cf/pages/commands.html) \n [Privacy Policy](https://www.watcherdiscord.cf/pages/privacy-policy.html) 
        \n **Important Links** \n [Invite Me](https://discord.com/api/oauth2/authorize?client_id=897868957988565102&permissions=1376805973078&scope=bot%20applications.commands) 
[Support Server](https://discord.gg/jqzCk54XA9)`)
        .setColor("WHITE");
        message.channel.send({ embeds: [userlol] })
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User",
  voiceChannel: "false"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
