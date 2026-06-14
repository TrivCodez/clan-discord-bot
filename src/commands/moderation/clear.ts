import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages')
    .addIntegerOption(option => option.setName('amount').setDescription('1-100').setRequired(true).setMinValue(1).setMaxValue(100))
    .addUserOption(option => option.setName('user').setDescription('Filter by user'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  cooldown: 10,
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount', true);
    const user = interaction.options.getUser('user');
    
    await interaction.deferReply({ ephemeral: true });
    
    const messages = await interaction.channel?.messages.fetch({ limit: amount });
    let filtered = messages;
    
    if (user) {
      filtered = messages?.filter(m => m.author.id === user.id);
    }
    
    const deleted = await interaction.channel?.bulkDelete(filtered || [], true);
    
    await interaction.editReply({ content: `✅ Deleted ${deleted?.size || 0} messages` });
  },
} satisfies Command;
