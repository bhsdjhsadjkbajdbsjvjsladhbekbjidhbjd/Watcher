exports.run =  async(client, message, args) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

    await queue.clear();

    message.channel.send(`The queue has just been cleared 🗑️`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["remove"],
    permLevel: "User",
    voiceChannel: "true"
  };
  
  exports.help = {
    name: "clear",
    category: "Music",
    description: "Clear music queue",
    usage: "clear"
  };
