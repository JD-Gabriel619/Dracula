// src/modules/nsfw/handlers/nsfwHandler.js
import { verifyAgeGate, createAgeGateModal } from '../utils/ageGate.js';
import { getNSFWConfig } from '../config.js';
import { logger } from '../../utils/logger.js';

export function registerNSFWHandlers(client) {
    client.on('interactionCreate', async interaction => {
        if (interaction.isButton() && interaction.customId === 'nsfw_enter') {
            await interaction.showModal(createAgeGateModal());
        }

        if (interaction.isModalSubmit() && interaction.customId === 'nsfw_age_gate') {
            const input = interaction.fields.getTextInputValue('age_confirmation');
            if (verifyAgeGate(input)) {
                await interaction.reply({ content: "✅ Age verified. You can now access NSFW channels.", ephemeral: true });
            } else {
                await interaction.reply({ content: "❌ You must be 18+ to access NSFW content.", ephemeral: true });
            }
        }
    });

    logger.info("✅ NSFW System handlers registered");
}