const Discord = module.require("discord.js");
const config = require("../config");

exports.run =  async (client, message, args) => {
    const avatar = message.author.avatarURL;
    const channel = client.channels.cache.get(config.suggestions);
    const suggestion = args.join(" ");
    if (!suggestion) {
      return message.channel.send("Please Suggest Something");
    }
    message.channel.send(
      `Your Suggestion has been Successfully Submitted. Our Mod Team will reply to you as soon as possible. 
      You can join our support server by using the command \`\`\`~invite\`\`\``);
    const embed = new Discord.MessageEmbed()
    .setTitle('NEW SUGGESTION')
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .addField('Suggestion', suggestion)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
    .setFooter(`ID: ${message.author.id}`)
    .setTimestamp();

    channel.send({ embeds: [embed] });
  },


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["idea"],
    permLevel: "User",
  voiceChannel: "false"
  };
  
  exports.help = {
    name: "suggest",
    category: "Miscellaneous",
    description: "Suggest a new feature or change for our bot to the devs.",
    usage: "suggest [Your suggestion]"
  };
