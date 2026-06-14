import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('deletechannel')
    .setDescription('Delete a channel')
    .addChannelOption(option => option.setName('channel').setDescription('Channel to delete'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  cooldown: 5,
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    try {
      await channel?.delete();
      await interaction.reply({ content: `✅ Deleted channel` });
    } catch {
      await interaction.reply({ content: '❌ Failed to delete channel', ephemeral: true });
    }
  },
} satisfies Command;
