import { Events, GuildMember } from 'discord.js';
import { EmbedBuilder } from '@discordjs/builders';

export default {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(client, member: GuildMember) {
    // Check if there's a welcome channel
    const welcomeChannel = member.guild.channels.cache.find(
      ch => ch.name.includes('welcome') || ch.name.includes('general')
    );

    if (!welcomeChannel || !welcomeChannel.isTextBased()) return;

    const welcomeEmbed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('🎉 Welcome to the Server!')
      .setDescription(
        `Hey ${member.user.tag}, welcome to **${member.guild.name}**!\n\n` +
        `Make sure to read the rules and introduce yourself!`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    await welcomeChannel.send({ embeds: [welcomeEmbed] });
  },
};
