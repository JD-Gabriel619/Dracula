// src/modules/nsfw/panels/nsfwPanel.js
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export function createNSFWPanel() {
    const embed = new EmbedBuilder()
        .setTitle("🔞 NSFW Content")
        .setDescription(
            "**Warning:** This area contains adult material.\n\n" +
            "You must be **18 years or older** to proceed.\n" +
            "Click the button below to confirm your age."
        )
        .setColor(0xFF0000)
        .setFooter({ text: "Proceed responsibly" });

    const button = new ButtonBuilder()
        .setCustomId('nsfw_enter')
        .setLabel('I am 18+ — Enter')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('🔓');

    const row = new ActionRowBuilder().addComponents(button);

    return { embeds: [embed], components: [row] };
}