import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Set slowmode for channel')
    .addIntegerOption(option => option.setName('seconds').setDescription('0-21600').setRequired(true).setMinValue(0).setMaxValue(21600))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  cooldown: 5,
  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds', true);
    
    if (!interaction.channel?.isTextBased()) return;
    
    await interaction.channel.setRateLimitPerUser(seconds);
    
    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('⏱️ Slowmode Updated')
      .setDescription(`Slowmode set to **${seconds}** seconds`)
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command;
