const { MessageEmbed } = require('discord.js');

exports.run =  async (client, message, args) => {
  const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(2).join(' ')

		const fetch = require('node-fetch');
		const ms = require('ms');
		const time = args.slice(1,2).join(' ');

		if(!time) return message.channel.send('please specify the time!');

    if(!message.member.permissions.has('0x0000010000000000')) { 
      const timeoutError = new MessageEmbed()
      .setDescription('**You don\'t have permissions to moderate/timeout members!**')
      return message.channel.send({ embeds: [timeoutError] })
    } else if(!message.guild.me.permissions.has('0x0000010000000000')) {
        const timeoutError1 = new MessageEmbed()
        .setDescription('**I don\'t have permissions to moderate/timeout members!**')
        return message.channel.send({ embeds: [timeoutError1] })
      }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position

        if(memberPosition <= mentionedPosition) {
            const timeoutErr = new MessageEmbed()
            .setDescription('**You cannot mute/timeout this member because their role is higher/equal to yours!**')
            return message.channel.send({ embeds: [timeoutErr] }) 
        } else if (botPosition <= mentionedPosition) { 
            const timeoutErr1 = new MessageEmbed()
            .setDescription('**I cannot mute/timeout this member because their role is higher/equal to mine!**')
            message.channel.send({ embeds: [timeoutErr1] })
        }

		const user = message.mentions.users.first();
		const milliseconds = ms(time);

		if(!user) return message.channel.send('no user specified');
		if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
			return message.channel.send('invalid time or it isn\'t 10s-28d');
		}

		const iosTime = new Date(Date.now() + milliseconds).toISOString();

		await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: iosTime }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
		});
    try{
      const reasonDm = new MessageEmbed()
      .setTitle(`You were muted by ${message.author.tag}!`)
      .setDescription(`\`Reason:\` = ${reason}
      \`Duration\` = ${time}`)
      await mentionedMember.send({ embeds: [reasonDm] }).then(() => {

		message.channel.send(`${user.username} has been timed out by ${message.author.tag}!
    \`Reason\` = ${reason}
    \`Duration\` = ${time}`);
	})}

  catch (error) {
    const errorEmbed = new MessageEmbed()
    .setDescription(':x: **There was an error while muting this user!**')
    return message.channel.send({ embeds: [errorEmbed] }) //send an embed when it caught error
}

try{
  const { getSettings, permlevel } = require("../modules/functions.js");
  const settings = message.settings = getSettings(message.guild);
  const channel = client.channels.cache.get(settings.modLogChannel);
  const embed = new MessageEmbed()
.setTitle('Muted')
.addField('User Muted', mentionedMember.user.tag)
.addField('Muted by', message.author.tag)
.addField('Reason', reason || none)
.setThumbnail(user.displayAvatarURL({ dynamic: true}))
.setFooter(`ID: ${mentionedMember.user.id}`)
.setTimestamp();

channel.send({ embeds: [embed] });}

catch (error) {
  const errorEmbed2 = new MessageEmbed()
  .setDescription(' Looks Like this server does not have a Mod Log Chanel. Use ~set command to set one.')
  return message.channel.send({ embeds: [errorEmbed2] }) //send an embed when it caught error 
  .then(msg=>msg.delete({timeout:500000 /*Time until delete in milliseconds*/}))
}

},

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["timeout"],
        permLevel: "User",
      voiceChannel: "false"
      };
      
      exports.help = {
        name: "mute",
        category: "Moderation",
        description: "Mute a user and stop them from sending any messages in any channel.",
        usage: "mute @user [Duration] [Reason]"
      };

