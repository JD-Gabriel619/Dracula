import {
    ActionRowBuilder
} from "discord.js";

import buildButton from "./buttonBuilder.js";
import buildSelect from "./selectBuilder.js";

/**
 * Build Discord Components
 */
export function buildComponents(data = {}) {

    const rows = [];

    /*
     * Buttons
     */

    if (Array.isArray(data.buttons) && data.buttons.length) {

        for (let i = 0; i < data.buttons.length; i += 5) {

            const row = new ActionRowBuilder();

            row.addComponents(

                data.buttons
                    .slice(i, i + 5)
                    .map(buildButton)

            );

            rows.push(row);

        }

    }

    /*
     * Select Menu
     */

    if (data.select) {

        const row = new ActionRowBuilder();

        row.addComponents(

            buildSelect(data.select)

        );

        rows.push(row);

    }

    return rows;

}

export default buildComponents;