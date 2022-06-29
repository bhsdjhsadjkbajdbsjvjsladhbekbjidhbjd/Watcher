const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
        let embed = new MessageEmbed()
        .setTitle(`Total Members`)
        .setDescription(`👥 ${message.guild.memberCount}\n\n**Human**\n👤 ${message.guild.members.cache.filter(member => !member.user.bot).size}\n\n**Bot**\n🤖 ${message.guild.members.cache.filter(member => member.user.bot).size}`)
        .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["mcount"],
        permLevel: "User",
      voiceChannel: "false"
      };
      
      exports.help = {
        name: "membercount",
        category: "Information",
        description: "Shows the total amount of Humanoid and Bot Members of the server",
        usage: "membercount"
      };