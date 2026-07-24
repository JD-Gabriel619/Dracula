import fs from "fs/promises";
import path from "path";

const ROOT = path.join(process.cwd(), "data", "nocthera", "panels");

export class PanelStorage {

    static async ensureGuild(guildId) {

        const folder = path.join(ROOT, guildId);

        await fs.mkdir(folder, {
            recursive: true
        });

        return folder;
    }

    static panelPath(guildId, panelId) {

        return path.join(
            ROOT,
            guildId,
            `${panelId}.json`
        );

    }

    static async save(panel) {

        await this.ensureGuild(panel.guildId);

        await fs.writeFile(
            this.panelPath(panel.guildId, panel.panelId),
            JSON.stringify(panel, null, 4),
            "utf8"
        );

        return panel;

    }

    static async get(guildId, panelId) {

        try {

            const data = await fs.readFile(
                this.panelPath(guildId, panelId),
                "utf8"
            );

            return JSON.parse(data);

        } catch {

            return null;

        }

    }

    static async delete(guildId, panelId) {

        try {

            await fs.unlink(
                this.panelPath(guildId, panelId)
            );

        } catch {}

    }

    static async getGuildPanels(guildId) {

        const folder = await this.ensureGuild(guildId);

        const files = await fs.readdir(folder);

        const panels = [];

        for (const file of files) {

            if (!file.endsWith(".json"))
                continue;

            try {

                const json = await fs.readFile(
                    path.join(folder, file),
                    "utf8"
                );

                panels.push(
                    JSON.parse(json)
                );

            } catch {

            }

        }

        return panels;

    }

    static async exists(guildId, panelId) {

        try {

            await fs.access(
                this.panelPath(guildId, panelId)
            );

            return true;

        } catch {

            return false;

        }

    }

    static async getAllGuilds() {

        try {

            return await fs.readdir(ROOT);

        } catch {

            return [];

        }

    }

}