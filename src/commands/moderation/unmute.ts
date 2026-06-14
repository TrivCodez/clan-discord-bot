import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute a member')
    .addUserOption(option => option.setName('target').setDescription('Member to unmute').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const member = await interaction.guild?.members.fetch(target.id);
    
    if (!member || !member.isCommunicationDisabled()) {
      return interaction.reply({ content: 'Not muted', ephemeral: true });
    }
    
    await member.timeout(null);
    
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('🔊 Unmuted')
      .addFields({ name: 'User', value: target.tag })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command;
