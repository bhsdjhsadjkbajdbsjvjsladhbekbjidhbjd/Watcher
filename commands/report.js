const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../config.js');

exports.run =
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
 async(client, message, args) => {
    const channel = client.channels.cache.get(config.reports);
     

     const query = args.join(" ");
     if (!query) return message.reply("please specify a query");

     const embed = new MessageEmbed()
     .setTitle('NEW BUG')
     .addField('Author', message.author.toString(), true)
     .addField('Guild', message.guild.name, true)
     .addField('Report', query)
     .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
     .setFooter(`ID: ${message.author.id}`)
     .setTimestamp();

     channel.send({embeds: [embed]});

     message.channel.send(
        `${message.author}, Your Report has been Successfully Submitted. Our Mod Team will reply to you as soon as possible. 
        You can join our support server by using the command \`\`\`~invite\`\`\``
      );
 }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["bug"],
    permLevel: "User",
  voiceChannel: "false"
  };
  
  exports.help = {
    name: "report",
    category: "Miscellaneous",
    description: "Report a bug or error in our bot to the devs.",
    usage: "report [Your issue]"
  };
