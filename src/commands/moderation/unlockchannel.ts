import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('unlockchannel')
    .setDescription('Unlock a channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  cooldown: 5,
  async execute(interaction) {
    if (!interaction.channel?.isTextBased()) return;
    await interaction.channel.permissionOverwrites.edit(interaction.guild!.roles.everyone, { SendMessages: true });
    await interaction.reply({ content: '🔓 Channel unlocked' });
  },
} satisfies Command;
