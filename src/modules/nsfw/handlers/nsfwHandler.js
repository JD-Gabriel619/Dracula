// src/modules/nsfw/handlers/nsfwHandler.js
import { createNSFWPanel } from '../panels/nsfwPanel.js';
import { verifyAgeGate, createAgeGateModal } from '../utils/ageGate.js';
import { getNSFWConfig } from '../config.js';
import { getGuildConfig } from '../../services/config/guildConfig.js';
import { logger } from '../../utils/logger.js';

export function registerNSFWHandlers(client) {
    
    client.on('interactionCreate', async interaction => {

        // NSFW Enter Button
        if (interaction.isButton() && interaction.customId === 'nsfw_enter') {
            await interaction.showModal(createAgeGateModal());
            return;
        }

        // Age Gate Modal
        if (interaction.isModalSubmit() && interaction.customId === 'nsfw_age_gate') {
            await interaction.deferReply({ ephemeral: true });

            const input = interaction.fields.getTextInputValue('age_confirmation');
            
            if (verifyAgeGate(input)) {
                const config = await getNSFWConfig(await getGuildConfig(interaction.client, interaction.guildId));
                
                if (config.nsfwRoleId) {
                    await interaction.member.roles.add(config.nsfwRoleId).catch(() => {});
                }
                
                await interaction.editReply({ 
                    content: "✅ Age verified. NSFW access granted." 
                });
            } else {
                await interaction.editReply({ 
                    content: "❌ You must be 18+ to access NSFW content." 
                });
            }
        }
    });

    logger.info("🔞 NSFW Age Gate system active");
}