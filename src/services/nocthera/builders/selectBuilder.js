import {
    StringSelectMenuBuilder
} from "discord.js";

/**
 * Build a Discord Select Menu from JSON
 */

function buildSelectAction(data) {

    if (!data.action)
        return "nocthera:select";

    switch (data.action) {

        case "roles":
            return "nocthera:roles";

        case "verification":
            return "nocthera:verification";

        case "ticket":
            return "nocthera:ticket";

        case "applications":
            return "nocthera:applications";

        default:
            return `nocthera:${data.action}`;

    }

}

export function buildSelect(data = {}) {

    const menu = new StringSelectMenuBuilder()

        .setCustomId(
            data.customId ??
            buildSelectAction(data)
        )

        .setPlaceholder(
            data.placeholder ?? "Choose an option..."
        )

        .setMinValues(
            data.minValues ?? 1
        )

        .setMaxValues(
            data.maxValues ?? 1
        );

    if (Array.isArray(data.options)) {

        menu.addOptions(

            data.options.map(option => ({

                label: option.label,

                value: option.value,

                description: option.description,

                emoji: option.emoji,

                default: option.default ?? false

            }))

        );

    }

    return menu;

}

export default buildSelect;