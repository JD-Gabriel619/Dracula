// src/handlers/loaders/commandLoader.js
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

export async function loadCommands(client) {
  const commandsPath = join(process.cwd(), 'src/commands');
  const categories = await readdir(commandsPath);

  for (const category of categories) {
    const categoryPath = join(commandsPath, category);
    const files = await readdir(categoryPath).catch(() => []);

    for (const file of files) {
      if (!file.endsWith('.js')) continue;

      try {
        const filePath = join(categoryPath, file);
        const command = await import(`file://${filePath}`);
        
        if (command.data && command.execute) {
          client.commands.set(command.data.name, command);
        }
      } catch (error) {
        console.error(`Failed to load command ${file}:`, error.message);
      }
    }
  }
}

export async function registerCommands(client, options) {
  try {
    const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
    
    const rest = client.rest;
    await rest.put(`/applications/${options.clientId}/commands`, { body: commands });
    
    console.log(`✅ Successfully registered ${commands.length} global slash commands`);
  } catch (error) {
    console.error('Failed to register slash commands:', error);
  }
}
