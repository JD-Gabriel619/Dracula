import { SlashCommandBuilder } from 'discord.js';
import { getNSFWConfig, setGuildConfig } from '../../services/config/guildConfig.js';

export const data = new SlashCommandBuilder()
    .setName('nsfw-toggle')
    .setDescription('Toggle NSFW mode for yourself')
    .setNSFW(true);

export async function execute(interaction) {
    const config = await getNSFWConfig(await getGuildConfig(interaction.client, interaction.guildId));

    if (!config.nsfwRoleId) {
        return interaction.reply({ content: "❌ NSFW system is not configured yet.", ephemeral: true });
    }

    const member = interaction.member;
    const hasRole = member.roles.cache.has(config.nsfwRoleId);

    if (hasRole) {
        await member.roles.remove(config.nsfwRoleId);
        await interaction.reply({ content: "🔒 NSFW mode disabled.", ephemeral: true });
    } else {
        await member.roles.add(config.nsfwRoleId);
        await interaction.reply({ content: "🔓 NSFW mode enabled.", ephemeral: true });
    }
}