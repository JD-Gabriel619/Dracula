import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Force reload all slash commands')
    .setDefaultMemberPermissions(8n);

export async function execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    
    try {
        const { registerCommands } = await import('../../handlers/loaders/commandLoader.js');
        await registerCommands(interaction.client, { clientId: interaction.client.config.bot.clientId });
        
        await interaction.editReply("✅ All slash commands have been reloaded!");
    } catch (error) {
        await interaction.editReply("❌ Failed to reload commands.");
    }
}