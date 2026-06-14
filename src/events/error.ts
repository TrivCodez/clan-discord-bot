import { Events } from 'discord.js';

export default {
  name: Events.Error,
  once: false,
  async execute(client, error: Error) {
    console.error('Discord client error:', error);
  },
};
