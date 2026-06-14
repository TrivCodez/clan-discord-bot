import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('resetnick')
    .setDescription('Reset a member's nickname')
    .addUserOption(option => option.setName('target').setDescription('Member').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const member = await interaction.guild?.members.fetch(target.id);
    if (!member) return interaction.reply({ content: 'Not found', ephemeral: true });
    await member.setNickname(null);
    await interaction.reply({ content: '✅ Nickname reset' });
  },
} satisfies Command;
