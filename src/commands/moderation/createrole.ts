import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('createrole')
    .setDescription('Create a new role')
    .addStringOption(option => option.setName('name').setDescription('Role name').setRequired(true))
    .addStringOption(option => option.setName('color').setDescription('Hex color'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  cooldown: 10,
  async execute(interaction) {
    const name = interaction.options.getString('name', true);
    const color = interaction.options.getString('color');
    
    try {
      const role = await interaction.guild!.roles.create({ name, color: color as any });
      await interaction.reply({ content: `✅ Created role ${role.name}` });
    } catch {
      await interaction.reply({ content: '❌ Failed to create role', ephemeral: true });
    }
  },
} satisfies Command;
