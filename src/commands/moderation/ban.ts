import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The member to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    )
    .addIntegerOption(option =>
      option
        .setName('days')
        .setDescription('Number of days of messages to delete (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  cooldown: 10,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const days = interaction.options.getInteger('days') || 0;

    const member = await interaction.guild?.members.fetch(target.id);

    if (!member) {
      return interaction.reply({ content: '❌ Member not found', ephemeral: true });
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply({ content: '❌ You cannot ban someone with equal or higher role', ephemeral: true });
    }

    if (!member.bannable) {
      return interaction.reply({ content: '❌ This member cannot be banned', ephemeral: true });
    }

    try {
      await member.ban({ deleteMessageSeconds: days * 86400, reason });

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('🔨 Member Banned')
        .addFields(
          { name: 'Member', value: `${target.tag} (${target.id})`, inline: true },
          { name: 'Moderator', value: interaction.user.tag, inline: true },
          { name: 'Reason', value: reason, inline: false }
        )
        .setTimestamp()
        .setThumbnail(target.displayAvatarURL());

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ content: '❌ Failed to ban the member', ephemeral: true });
    }
  },
} satisfies Command;
