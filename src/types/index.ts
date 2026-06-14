export interface Command {
  data: any; // SlashCommandBuilder
  execute: (interaction: any) => Promise<void>;
  cooldown?: number;
  autocomplete?: (interaction: any) => Promise<void>;
}

export interface Clan {
  id: string;
  name: string;
  tag: string;
  owner: string;
  members: string[];
  level: number;
  xp: number;
  wins: number;
  losses: number;
  createdAt: Date;
}

export interface UserLevel {
  userId: string;
  guildId: string;
  level: number;
  xp: number;
  totalXp: number;
  messagesSent: number;
  voiceMinutes: number;
}

export interface UserEconomy {
  userId: string;
  guildId: string;
  balance: number;
  bank: number;
  dailyStreak: number;
  lastDaily: Date;
  lastWork: Date;
  inventory: string[];
}

export interface Ticket {
  id: string;
  userId: string;
  channelId: string;
  guildId: string;
  status: 'open' | 'closed';
  createdAt: Date;
  closedAt?: Date;
  closedBy?: string;
}

export interface Giveaway {
  id: string;
  messageId: string;
  channelId: string;
  guildId: string;
  prize: string;
  winners: number;
  duration: number;
  endsAt: Date;
  participants: string[];
  host: string;
}
