// src/handlers/loaders/commandLoader.js
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client) {
  const commandsPath = join(process.cwd(), 'src/commands');
  let totalLoaded = 0;

  try {
    const categories = await readdir(commandsPath);

    for (const category of categories) {
      const categoryPath = join(commandsPath, category);
      
      try {
        const files = await readdir(categoryPath);
        
        for (const file of files) {
          if (!file.endsWith('.js')) continue;

          const filePath = join(categoryPath, file);
          
          try {
            const command = await import(`file://${filePath}`);

            if (command.data && typeof command.execute === 'function') {
              client.commands.set(command.data.name, command);
              totalLoaded++;
              console.log(`✅ Loaded command: ${command.data.name} (${category})`);
            }
          } catch (importError) {
            console.error(`❌ Failed to load ${file}:`, importError.message);
          }
        }
      } catch (dirError) {
        // Skip non-directory items
      }
    }
  } catch (error) {
    console.error('Error loading commands:', error);
  }

  console.log(`📊 Total commands loaded: ${totalLoaded}`);
  return totalLoaded;
}

export async function registerCommands(client, options) {
  try {
    const commands = Array.from(client.commands.values())
      .map(cmd => cmd.data.toJSON());

    const rest = client.rest;
    await rest.put(`/applications/${options.clientId}/commands`, { body: commands });

    console.log(`✅ Successfully registered ${commands.length} global slash commands`);
  } catch (error) {
    console.error('Failed to register slash commands:', error);
  }
}
