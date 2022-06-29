const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
        let embed = new MessageEmbed()
        .setDescription(`***Hey there. You can Invite me by***
        [Clicking Here](https://discord.com/api/oauth2/authorize?client_id=897868957988565102&permissions=1376805973078&scope=bot%20applications.commands)
        
        ***OR***

        ***Join our Discord Server by***
        [clicking Here](https://discord.gg/jqzCk54XA9)`)
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["inv"],
        permLevel: "User",
      voiceChannel: "false"
      };
      
      exports.help = {
        name: "invite",
        category: "Information",
        description: "Gives you the invite link for the bot and it's support server",
        usage: "invite"
      };