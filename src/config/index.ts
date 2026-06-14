export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN!,
    clientId: process.env.CLIENT_ID!,
    guildId: process.env.GUILD_ID,
  },
  bot: {
    ownerId: process.env.BOT_OWNER_ID!,
    defaultPrefix: '!',
    embedColor: 0x5865F2,
    maxListeners: 50,
  },
  database: {
    url: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
  },
  features: {
    leveling: true,
    economy: true,
    moderation: true,
    music: true,
    clan: true,
    tickets: true,
    giveaways: true,
    automod: true,
  },
  limits: {
    maxRolesPerUser: 50,
    maxChannelsPerGuild: 500,
    maxEmbedSize: 6000,
    rateLimitWindow: 10000,
    rateLimitMax: 5,
  },
};
