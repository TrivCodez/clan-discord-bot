declare module 'discord.js' {
  interface Client {
    commands: Collection<any, any>;
    cooldowns: Collection<string, Collection<string, number>>;
  }
}
