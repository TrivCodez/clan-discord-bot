import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadEvents(client: Client) {
  const eventFiles = readdirSync(join(__dirname, '../events')).filter(f => f.endsWith('.js'));

  for (const file of eventFiles) {
    try {
      const event = (await import(`../events/${file}`)).default;
      const execute = (...args: any[]) => event.execute(client, ...args);
      
      if (event.once) {
        client.once(event.name, execute);
      } else {
        client.on(event.name, execute);
      }
      
      logger.success(`Loaded event: ${event.name}`);
    } catch (error) {
      logger.error(`Failed to load event ${file}:`, error);
    }
  }
}
