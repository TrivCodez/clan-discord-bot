import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption(option => option.setName('target').setDescription('Member to warn').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const reason = interaction.options.getString('reason', true);
    
    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setTitle('⚠️ Warning Issued')
      .addFields(
        { name: 'Member', value: target.tag, inline: true },
        { name: 'Moderator', value: interaction.user.tag, inline: true },
        { name: 'Reason', value: reason }
      )
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
    try {
      await target.send({ content: `You received a warning in **${interaction.guild?.name}**\nReason: ${reason}` });
    } catch {}
  },
} satisfies Command;
