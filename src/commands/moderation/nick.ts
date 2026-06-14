import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('nick')
    .setDescription('Change a member's nickname')
    .addUserOption(option => option.setName('target').setDescription('Member').setRequired(true))
    .addStringOption(option => option.setName('nickname').setDescription('New nickname').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const nick = interaction.options.getString('nickname', true);
    const member = await interaction.guild?.members.fetch(target.id);
    if (!member) return interaction.reply({ content: 'Not found', ephemeral: true });
    await member.setNickname(nick);
    await interaction.reply({ content: `✅ Nickname changed to ${nick}` });
  },
} satisfies Command;
