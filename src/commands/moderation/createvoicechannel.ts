import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('createvoicechannel')
    .setDescription('Create a voice channel')
    .addStringOption(option => option.setName('name').setDescription('Channel name').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  cooldown: 10,
  async execute(interaction) {
    const name = interaction.options.getString('name', true);
    try {
      await interaction.guild!.channels.create({ name, type: ChannelType.GuildVoice });
      await interaction.reply({ content: `✅ Created voice channel ${name}` });
    } catch {
      await interaction.reply({ content: '❌ Failed to create channel', ephemeral: true });
    }
  },
} satisfies Command;
