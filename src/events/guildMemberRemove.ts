import { Events, GuildMember } from 'discord.js';
import { EmbedBuilder } from '@discordjs/builders';

export default {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(client, member: GuildMember) {
    const logChannel = member.guild.channels.cache.find(
      ch => ch.name.includes('log') || ch.name.includes('mod-log')
    );

    if (!logChannel || !logChannel.isTextBased()) return;

    const leaveEmbed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('👋 Member Left')
      .addFields(
        { name: 'User', value: `${member.user.tag} (${member.id})`, inline: true },
        { name: 'Joined', value: member.joinedAt?.toDateString() || 'Unknown', inline: true },
        { name: 'Roles', value: member.roles.cache.map(r => r.name).join(', ').slice(0, 1000), inline: false }
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    await logChannel.send({ embeds: [leaveEmbed] });
  },
};
