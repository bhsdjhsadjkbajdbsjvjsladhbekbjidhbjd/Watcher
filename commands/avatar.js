const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let embed = new MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)

        .addField('PNG', `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`, true)
        .addField('JPG', `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" })})`, true)
        .addField('WEBP', `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "webp" })})`, true)

        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["av"],
        permLevel: "User",
        voiceChannel: "false"
      };
      
      exports.help = {
        name: "avatar",
        category: "Information",
        description: "Gives you a user's Avatar Picture",
        usage: "avatar"
      };