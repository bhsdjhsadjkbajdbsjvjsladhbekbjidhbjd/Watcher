const { MessageEmbed } = require('discord.js');

exports.run =  async(client, message, args) => {
        const msg = client.snipes.get(message.channel.id) //find the deleted message in message channel
        if(!msg) return message.channel.send("Didn't find any deleted messages.") //if there is no deleted message, return this msg

        const embed = new MessageEmbed()
        .setDescription(`**Snipe in <#${message.channel.id}>**\n\n` + 'Message: by: ' + `<@${msg.author}>` + '\nContent: \n' + msg.content)
        .setTimestamp()

        if(msg.image) embed.setImage(msg.image) //if the deleted message has image, then set the image in the embed to it
        message.channel.send({ embeds: [embed] })
    }

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["peek"],
        permLevel: "User",
      voiceChannel: "false"
      };
      
      exports.help = {
        name: "snipe",
        category: "Miscellaneous",
        description: "Gets the last deleted message",
        usage: "snipe"
      };
