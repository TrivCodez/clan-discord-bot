import { Client, Collection, Events, REST, Routes } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import type { Command } from '../types/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client: Client) {
  const commands: Command[] = [];
  const commandDirs = [
    'moderation',
    'leveling',
    'economy',
    'clan',
    'fun',
    'utility',
    'music',
    'info',
    'configuration',
    'automod',
    'tickets',
    'giveaways',
    'logging',
    'custom',
    'owner',
  ];

  for (const dir of commandDirs) {
    const commandDir = join(__dirname, '../commands', dir);
    
    try {
      const files = readdirSync(commandDir).filter(f => f.endsWith('.js'));
      logger.info(`Loading ${files.length} commands from ${dir}/`);
      
      for (const file of files) {
        try {
          const command: Command = (await import(`../commands/${dir}/${file}`)).default;
          
          if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
            logger.success(`Loaded command: ${command.data.name}`);
          } else {
            logger.warn(`Command ${file} is missing required properties`);
          }
        } catch (error) {
          logger.error(`Failed to load command ${file}:`, error);
        }
      }
    } catch (error) {
      logger.error(`Failed to read directory ${dir}:`, error);
    }
  }

  logger.success(`Total commands loaded: ${client.commands.size}`);
  return commands;
}

export async function deployCommands(commands: any[], clientId: string, guildId?: string) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

  try {
    logger.info('Started refreshing application (/) commands.');

    if (guildId) {
      // Guild-specific commands (instant)
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
      );
      logger.success(`Successfully registered ${commands.length} guild commands.`);
    } else {
      // Global commands (up to 1 hour)
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
      );
      logger.success(`Successfully registered ${commands.length} global commands.`);
    }
  } catch (error) {
    logger.error('Failed to deploy commands:', error);
  }
}
