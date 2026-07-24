import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('nsfw-channel')
    .setDescription('Mark this channel as NSFW')
    .setDefaultMemberPermissions(8n);

export async function execute(interaction) {
    await interaction.channel.setNSFW(true);
    await interaction.reply({ content: `✅ ${interaction.channel} is now marked as NSFW.` });
}