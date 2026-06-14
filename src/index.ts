import { Client, GatewayIntentBits, Collection, ActivityType } from 'discord.js';
import { config } from './config/index.js';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';
import { logger } from './utils/logger.js';
import { connectDatabase } from './database/index.js';

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
  ],
});

// Collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Event handlers
client.once('ready', async () => {
  logger.success(`Bot logged in as ${client.user.tag}`);
  logger.info(`Serving ${client.guilds.cache.size} servers`);
  
  // Set activity
  client.user.setPresence({
    activities: [{ name: 'Clan Management', type: ActivityType.Watching }],
    status: 'online',
  });
  
  // Connect to database
  if (config.database.url) {
    await connectDatabase();
  }
});

// Initialize handlers
async function initialize() {
  try {
    // Load commands
    await loadCommands(client);
    
    // Load events
    await loadEvents(client);
    
    // Login
    await client.login(config.discord.token);
  } catch (error) {
    logger.error('Failed to initialize bot:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Start the bot
initialize();

export default client;
