const logger = require("../modules/logger.js");
const { getSettings, permlevel } = require("../modules/functions.js");
const config = require("../config.js");

module.exports = async (client, interaction) => {
  // Music Setup
  if (!interaction.isButton()) return;

  const queue = player.getQueue(interaction.guildId);

  switch (interaction.customId) {
      case 'saveTrack': {
          if (!queue || !queue.playing) return interaction.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true, components: [] });

          interaction.member.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${interaction.member.guild.name} ✅`).then(() => {
              return interaction.reply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true, components: [] });
          }).catch(error => {
              return interaction.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true, components: [] });
          });
      }
  }
  // If it's not a command, stop.
  if (!interaction.isCommand()) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = interaction.settings = getSettings(interaction.guild);

  // Get the user or member's permission level from the elevation
  const level = permlevel(interaction);
  
  // Grab the command data from the client.container.slashcmds Collection
  const cmd = client.container.slashcmds.get(interaction.commandName);
  
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Since the permission system from Discord is rather limited in regarding to
  // Slash Commands, we'll just utilise our permission checker.
  if (level < client.container.levelCache[cmd.conf.permLevel]) {
    // Due to the nature of interactions we **must** respond to them otherwise
    // they will error out because we didn't respond to them.
    return await interaction.reply({
      content: `This command can only be used by ${cmd.conf.permLevel}'s only`,
      // This will basically set the ephemeral response to either announce
      // to everyone, or just the command executioner. But we **HAVE** to 
      // respond.
      ephemeral: settings.systemNotice !== "true"
    });
  }

  // If everything checks out, run the command
  try {
    await cmd.run(client, interaction);
    const logchannel = client.channels.cache.get(config.botlogs);
    logchannel.send(`\`\`\` 🖥️Slash command Used = ${interaction.commandName} \n 🥇Level = ${config.permLevels.find(l => l.level === level).name} \n 🤠User = ${interaction.user.tag} (${interaction.user.id}) \n 🔰Guild = ${interaction.guild.name} (${interaction.guild.id}) \n 🛄Channel = ${interaction.channel.name} (${interaction.channel.id})\`\`\``, "cmd");
    logger.log(`${config.permLevels.find(l => l.level === level).name} ${interaction.user.id} ran slash command ${interaction.commandName}`, "cmd");

  } catch (e) {
    console.error(e);
    if (interaction.replied) 
      interaction.followUp({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
    if (interaction.deferred)
      interaction.editReply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
      interaction.reply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred replying on an error", e));
  }
};
