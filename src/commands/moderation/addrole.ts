import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Add a role to a member')
    .addUserOption(option => option.setName('target').setDescription('Member').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('Role to add').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  cooldown: 5,
  async execute(interaction) {
    const target = interaction.options.getUser('target', true);
    const role = interaction.options.getRole('role', true);
    const member = await interaction.guild?.members.fetch(target.id);
    if (!member) return interaction.reply({ content: 'Not found', ephemeral: true });
    await member.roles.add(role.id);
    await interaction.reply({ content: `✅ Added ${role.name} to ${target.tag}` });
  },
} satisfies Command;
