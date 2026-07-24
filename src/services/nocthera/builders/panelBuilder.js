import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    EmbedBuilder
} from "discord.js";

const BUTTON_STYLES = {
    Primary: ButtonStyle.Primary,
    Secondary: ButtonStyle.Secondary,
    Success: ButtonStyle.Success,
    Danger: ButtonStyle.Danger,
    Link: ButtonStyle.Link
};

export class PanelBuilder {

    static buildEmbed(data) {

        const embed = new EmbedBuilder();

        if (data.title)
            embed.setTitle(data.title);

        if (data.description)
            embed.setDescription(data.description);

        if (data.color)
            embed.setColor(data.color);

        if (data.footer)
            embed.setFooter({ text: data.footer });

        if (data.thumbnail)
            embed.setThumbnail(data.thumbnail);

        if (data.image)
            embed.setImage(data.image);

        return embed;
    }

    static buildButton(component) {

        const button = new ButtonBuilder()
            .setCustomId(component.id)
            .setLabel(component.label || "Button")
            .setStyle(
                BUTTON_STYLES[component.style] ||
                ButtonStyle.Secondary
            );

        if (component.emoji)
            button.setEmoji(component.emoji);

        if (component.disabled)
            button.setDisabled(true);

        if (component.url) {
            button
                .setStyle(ButtonStyle.Link)
                .setURL(component.url);
        }

        return button;
    }

    static buildSelect(component) {

        return new StringSelectMenuBuilder()
            .setCustomId(component.id)
            .setPlaceholder(component.placeholder || "Select")
            .addOptions(component.options);
    }

    static buildComponents(components = []) {

        const rows = [];

        let current = new ActionRowBuilder();

        let count = 0;

        for (const component of components) {

            if (component.type === "button") {

                current.addComponents(
                    this.buildButton(component)
                );

                count++;

                if (count === 5) {

                    rows.push(current);

                    current = new ActionRowBuilder();

                    count = 0;
                }
            }

            if (component.type === "select") {

                rows.push(
                    new ActionRowBuilder()
                        .addComponents(
                            this.buildSelect(component)
                        )
                );
            }

        }

        if (count > 0)
            rows.push(current);

        return rows;
    }

    static async build(panel) {

        return {

            embeds: [
                this.buildEmbed(panel)
            ],

            components: this.buildComponents(
                panel.components || []
            )

        };

    }

}