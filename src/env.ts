import { config } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is required');
}

if (!process.env.CLIENT_ID) {
  throw new Error('CLIENT_ID is required');
}

console.log('✓ Environment variables loaded successfully');
