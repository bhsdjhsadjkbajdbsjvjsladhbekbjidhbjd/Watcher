const Discord = module.require("discord.js");
const config = require("../config");

exports.run =  async (client, message, args) => {
    const anchannel = message.mentions.channels.first();
    if (!anchannel) {
      return message.channel.send("`Usage = announce [#Channel] [Announcement]`");
    }
    if (!args.slice(1).join(" ")) {
      return message.channel.send(
        "Please add some text to make an Announcement"
      );
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(`Announcement`)
      .setDescription(args.slice(1).join(" "), {
        allowedMentions: { parse: ["users"] },
      })
      .setColor("RANDOM")
      .setFooter(`Announcement by ${message.author.username}`);
    anchannel.send({ embeds: [embed] });

    let anembed = new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor("RANDOM");

    message.channel.send({ embeds: [anembed] });
    message.delete();
  },


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["announcement"],
    permLevel: "User",
    voiceChannel: "false"
  };
  
  exports.help = {
    name: "announce",
    category: "Moderation",
    description: "Announce something in an Embed",
    usage: "announce [#Channel] [Announcement]"
  };
