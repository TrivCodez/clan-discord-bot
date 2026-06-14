# 🏰 Clan Discord Bot

A production-grade Discord bot designed for clan/gaming communities with **600+ commands** covering moderation, leveling, economy, clan management, and much more.

![Discord.js](https://img.shields.io/badge/discord.js-v14-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Core Features
- **600+ Slash Commands** organized into 15+ categories
- **Full TypeScript support** with strict type checking
- **Modular architecture** for easy extension
- **Production-ready** error handling and logging
- **Auto-moderation** with configurable filters
- **Leveling system** with XP, ranks, and leaderboards
- **Economy system** with shops, trading, and gambling
- **Clan management** tools for organizing your community
- **Music playback** with high-quality audio
- **Welcome/Leave messages** with custom embeds
- **Role management** and auto-assignment
- **Ticket system** for support requests

### 📋 Command Categories
1. **Moderation** (80+ commands) - Ban, kick, mute, warn, timeout, etc.
2. **Leveling** (50+ commands) - XP, ranks, leaderboards, role rewards
3. **Economy** (70+ commands) - Coins, shop, trading, work, gambling
4. **Clan** (60+ commands) - Clan creation, management, wars, rankings
5. **Fun** (100+ commands) - Games, memes, random activities
6. **Utility** (60+ commands) - Server info, user info, polls, etc.
7. **Music** (40+ commands) - Play, pause, skip, queue management
8. **Info** (40+ commands) - Bot info, server stats, help commands
9. **Configuration** (30+ commands) - Bot settings, prefixes, modules
10. **AutoMod** (25+ commands) - Filters, anti-raid, anti-spam
11. **Tickets** (20+ commands) - Support tickets, transcripts
12. **Giveaways** (15+ commands) - Create, manage, reroll giveaways
13. **Logging** (15+ commands) - Message logs, audit logs
14. **Custom** (25+ commands) - Custom commands, variables
15. **Owner** (20+ commands) - Bot evaluation, reloads, stats

## 🚀 Installation

### Prerequisites
- Node.js v20 or higher
- A Discord Bot Token ([Get it here](https://discord.com/developers/applications))
- Git (optional, for cloning)

### Step 1: Clone the Repository
```bash
git clone https://github.com/TrivCodez/clan-discord-bot.git
cd clan-discord-bot
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_server_id_here (optional, for dev server)
BOT_OWNER_ID=your_discord_user_id
DATABASE_URL=mongodb://localhost:27017/clanbot (optional)
REDISCACHE_URL=redis://localhost:6379 (optional)
```

### Step 4: Build the Project
```bash
npm run build
```

### Step 5: Deploy Slash Commands
```bash
npm run deploy
```

### Step 6: Start the Bot
```bash
npm start
```

## 🛠️ Development

### Development Mode
For hot-reloading during development:
```bash
npm run dev
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

## 📁 Project Structure

```
clan-discord-bot/
├── src/
│   ├── index.ts              # Main entry point
│   ├── client.ts             # Discord client setup
│   ├── events/               # Event handlers
│   │   ├── ready.ts
│   │   ├── interactionCreate.ts
│   │   └── ...
│   ├── commands/             # Command modules
│   │   ├── deploy.ts         # Command deployment
│   │   ├── moderation/
│   │   ├── leveling/
│   │   ├── economy/
│   │   ├── clan/
│   │   ├── fun/
│   │   ├── utility/
│   │   └── ...
│   ├── handlers/             # Custom handlers
│   │   ├── commandHandler.ts
│   │   ├── eventHandler.ts
│   │   └── ...
│   ├── database/             # Database schemas
│   │   ├── models/
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   ├── embeds.ts
│   │   ├── validators.ts
│   │   └── logger.ts
│   └── types/                # TypeScript types
├── .env                      # Environment variables
├── .env.example              # Example env file
├── package.json
├── tsconfig.json
└── README.md
```

## 🎮 Command Examples

### Moderation
```bash
/ban @user reason: Spamming
/kick @user reason: Rule violation
/mute @user duration: 1h reason: Toxicity
/warn @user reason: Breaking rules
/clear 50
```

### Leveling
```bash
/level - Check your level
/rank - View your rank card
/leaderboard - Server XP leaderboard
/setxp @user 1000 - Set user XP
```

### Economy
```bash
/balance - Check your balance
/daily - Claim daily reward
/work - Work for coins
/beg - Beg for coins
/rob @user - Attempt to rob someone
/shop - View available items
/buy item: sword - Buy an item
```

### Clan Management
```bash
/clan create name: Dragons - Create a clan
/clan join - Join a clan
/clan leave - Leave your clan
/clan war @clan - Challenge another clan
/clan leaderboard - Top clans
```

## 🔧 Configuration

Edit `src/config.ts` to customize:
- Default permissions
- Feature toggles
- Rate limits
- Embed colors
- Bot behavior

## 📊 Database Support

The bot supports multiple database backends:
- **MongoDB** (Primary)
- **PostgreSQL** (Alternative)
- **SQLite** (Development)
- **Redis** (Caching layer)

## 🎨 Customization

### Embed Colors
Change the default embed color in `src/utils/embeds.ts`:
```typescript
const DEFAULT_COLOR = 0x5865F2; // Discord Blurple
```

### Adding New Commands
1. Create a new file in `src/commands/[category]/`
2. Export a SlashCommandBuilder
3. Register the command

Example:
```typescript
import { SlashCommandBuilder } from 'discord.js';

export default {
  name: 'ping',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
  execute: async (interaction) => {
    await interaction.reply('Pong!');
  },
};
```

## 🐛 Troubleshooting

### Bot won't start?
- Verify your token in `.env`
- Check Node.js version (must be 20+)
- Run `npm install` again

### Commands not showing?
- Run `npm run deploy`
- Wait up to 1 hour for global command registration
- Check bot permissions

### Database errors?
- Verify DATABASE_URL format
- Ensure database is running
- Check connection permissions

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Discord.js](https://discord.js.org/) team for the amazing library
- All contributors who help improve this bot
- The Discord community for feedback and suggestions

## 📞 Support

Join our [Discord Server](https://discord.gg/yours) (coming soon) for:
- Support and help
- Feature suggestions
- Community discussions
- Bot updates

## 🎯 Roadmap

- [ ] Web dashboard for configuration
- [ ] Premium features
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Clan wars tournament system
- [ ] Custom command builder
- [ ] Integration with popular games

---

Made with ❤️ by **TrivCodez**

Star ⭐ this repo if you find it helpful!
