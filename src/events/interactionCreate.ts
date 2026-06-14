import { Events, Interaction, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { logger } from '../utils/logger.js';
import { config } from '../config/index.js';

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(client, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      logger.warn(`Unknown command: ${interaction.commandName}`);
      return;
    }

    // Check cooldown
    const { cooldowns } = client;
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name)!;
    const cooldownAmount = (command.cooldown || 5) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id)! + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
        return interaction.reply({
          content: `Please wait ${timeLeft} more seconds before reusing this command.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    // Execute command
    try {
      await command.execute(interaction);
      logger.info(
        `Command executed: ${command.data.name} by ${interaction.user.tag} in ${interaction.guild?.name}`
      );
    } catch (error: any) {
      logger.error(`Error executing ${command.data.name}:`, error);
      
      const errorMsg = new EmbedBuilder()
        .setColor('Red')
        .setTitle('❌ Error')
        .setDescription('An error occurred while executing this command.')
        .addFields({ name: 'Details', value: error.message?.slice(0, 1000) || 'Unknown error' })
        .setTimestamp();

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [errorMsg], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorMsg], ephemeral: true });
      }
    }
  },
};
