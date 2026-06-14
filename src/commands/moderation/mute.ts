import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a member (text channels)')
    .addUserOption(option => option.setName('target').setDescription('Member to mute').setRequired(true)) 
    .addStringOption(option => option.setName('reason').setDescription('Reason'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const reason = interaction.options.getString('reason') || 'No reason';
    const member = await interaction.guild?.members.fetch(target.id);
    
    if (!member) return interaction.reply({ content: 'Not found', ephemeral: true });
    
    await member.timeout(10 * 60 * 1000, reason);
    
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('🔇 Muted')
      .addFields({ name: 'User', value: target.tag }, { name: 'Reason', value: reason })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command;
