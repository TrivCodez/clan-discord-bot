import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a member (slow mode)')
    .addUserOption(option =>
      option.setName('target').setDescription('The member to timeout').setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duration').setDescription('Duration in minutes').setRequired(true).setMinValue(1).setMaxValue(40320)
    )
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for timeout')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const duration = interaction.options.getInteger('duration', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const member = await interaction.guild?.members.fetch(target.id);

    if (!member) return interaction.reply({ content: 'Member not found', ephemeral: true });
    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply({ content: 'Cannot timeout higher ranked member', ephemeral: true });
    }

    await member.timeout(duration * 60 * 1000, reason);

    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setTitle('⏱️ Member Timed Out')
      .addFields(
        { name: 'Member', value: target.tag, inline: true },
        { name: 'Duration', value: `${duration} minutes`, inline: true },
        { name: 'Reason', value: reason or '-' }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command;
