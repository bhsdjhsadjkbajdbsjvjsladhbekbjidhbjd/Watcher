const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

exports.run =
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
async (client, message, args, Discord) => {

    if(!message.member.permissions.has('MANAGE_MESSAGES')) { //if you (user) don't have kick member permission then
        const messageError = new MessageEmbed()
        .setDescription('**You don\'t have permissions to delete messages!**')
        return message.channel.send({ embeds: [messageError] }) //return this embed
    }
        try {
            let delamount = args[0];
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('Error:')

            if (parseInt(delamount) > 99) return message.reply('you cant delete 100+ messages at a time!')

            await message.channel.bulkDelete(parseInt(delamount) + 1, true);

            await message.channel.send('Purged!').then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000) // 5 seconds
            })
        } catch (e) {
            console.log(e)
        } //lets try it
    }

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["clear"],
        permLevel: "User",                           voiceChannel: "false"
      };
      
      exports.help = {
        name: "purge",
        category: "Moderation",
        description: "Deletes the specified number of messages from a channel",
        usage: "purge [Amount]"
      };