import { PanelBuilder } from "../builders/panelBuilder.js";
import { PanelStorage } from "./panelStorage.js";

export class PanelManager {

    /**
     * Create a brand new panel
     */
    static async create(channel, panelData) {

        const payload = await PanelBuilder.build(panelData);

        const message = await channel.send(payload);

        panelData.messageId = message.id;
        panelData.channelId = channel.id;
        panelData.guildId = channel.guild.id;

        await PanelStorage.save(panelData);

        return message;
    }

    /**
     * Edit an existing panel
     */
    static async update(panelData) {

        const guild = global.client.guilds.cache.get(panelData.guildId);

        if (!guild)
            return false;

        const channel = guild.channels.cache.get(panelData.channelId);

        if (!channel)
            return false;

        const message = await channel.messages
            .fetch(panelData.messageId)
            .catch(() => null);

        if (!message)
            return false;

        const payload = await PanelBuilder.build(panelData);

        await message.edit(payload);

        await PanelStorage.save(panelData);

        return true;
    }

    /**
     * Delete a panel
     */
    static async delete(panelData) {

        const guild = global.client.guilds.cache.get(panelData.guildId);

        if (!guild)
            return false;

        const channel = guild.channels.cache.get(panelData.channelId);

        if (!channel)
            return false;

        const message = await channel.messages
            .fetch(panelData.messageId)
            .catch(() => null);

        if (message)
            await message.delete().catch(() => {});

        await PanelStorage.delete(
            panelData.guildId,
            panelData.panelId
        );

        return true;
    }

    /**
     * Refresh every panel in a guild
     */
    static async refreshGuild(guildId) {

        const panels = await PanelStorage.getGuildPanels(guildId);

        for (const panel of panels) {

            await this.update(panel)
                .catch(console.error);

        }

    }

    /**
     * Refresh one panel
     */
    static async refresh(panelId, guildId) {

        const panel = await PanelStorage.get(
            guildId,
            panelId
        );

        if (!panel)
            return false;

        return this.update(panel);

    }

}