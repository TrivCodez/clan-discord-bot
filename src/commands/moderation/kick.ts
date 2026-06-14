import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The member to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the kick')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 10,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const member = await interaction.guild?.members.fetch(target.id);

    if (!member) {
      return interaction.reply({ content: '❌ Member not found', ephemeral: true });
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply({ content: '❌ You cannot kick someone with equal or higher role', ephemeral: true });
    }

    if (!member.kickable) {
      return interaction.reply({ content: '❌ This member cannot be kicked', ephemeral: true });
    }

    try {
      await member.kick(reason);

      const embed = new EmbedBuilder()
        .setColor('Orange')
        .setTitle('👢 Member Kicked')
        .addFields(
          { name: 'Member', value: `${target.tag} (${target.id})`, inline: true },
          { name: 'Moderator', value: interaction.user.tag, inline: true },
          { name: 'Reason', value: reason, inline: false }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch {
      await interaction.reply({ content: '❌ Failed to kick the member', ephemeral: true });
    }
  },
} satisfies Command;
