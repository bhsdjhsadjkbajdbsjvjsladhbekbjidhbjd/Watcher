exports.run =  async(client, message, args) => {
    const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.author}... try again ? ❌`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["next"],
    permLevel: "User",
    voiceChannel: "true"
  };
  
  exports.help = {
    name: "skip",
    category: "Music",
    description: "Skip the song playing",
    usage: "skip"
  };
