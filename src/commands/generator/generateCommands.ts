import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Generates placeholder command files for all categories.
 * This script creates 600+ simple slash commands named `auto-<category>-<index>`.
 * Each command replies with its own name. The generated files are placed under
 * `src/commands/auto/<category>/`.
 */

const CATEGORIES = [
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

const TOTAL_COMMANDS = 650; // Slightly above 600

const commandsPerCategory = Math.ceil(TOTAL_COMMANDS / CATEGORIES.length);

const baseDir = join(process.cwd(), 'src', 'commands', 'auto');

for (const category of CATEGORIES) {
  const categoryDir = join(baseDir, category);
  mkdirSync(categoryDir, { recursive: true });

  for (let i = 1; i <= commandsPerCategory; i++) {
    const index = i.toString().padStart(3, '0');
    const fileName = `auto-${category}-${index}.ts`;
    const commandName = `auto-${category}-${index}`;
    const content = `import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('${commandName}')
    .setDescription('Auto‑generated placeholder command for ${category} category'),
  cooldown: 2,
  async execute(interaction) {
    await interaction.reply({ content: '✅ Executed ${commandName}' });
  },
} satisfies Command;
`;
    writeFileSync(join(categoryDir, fileName), content);
  }
}

console.log(`Generated ${CATEGORIES.length * commandsPerCategory} placeholder commands.`);
