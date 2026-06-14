import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('lockchannel')
    .setDescription('Lock a channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  cooldown: 5,
  async execute(interaction) {
    if (!interaction.channel?.isTextBased()) return;
    
    await interaction.channel.permissionOverwrites.edit(interaction.guild!.roles.everyone, { SendMessages: false });
    
    await interaction.reply({ content: '🔒 Channel locked' });
  },
} satisfies Command;
