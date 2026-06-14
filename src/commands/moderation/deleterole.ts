import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('deleterole')
    .setDescription('Delete a role')
    .addRoleOption(option => option.setName('role').setDescription('Role to delete').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  cooldown: 5,
  async execute(interaction) {
    const role = interaction.options.getRole('role', true);
    try {
      await role.delete();
      await interaction.reply({ content: `✅ Deleted role ${role.name}` });
    } catch {
      await interaction.reply({ content: '❌ Failed to delete role', ephemeral: true });
    }
  },
} satisfies Command;
