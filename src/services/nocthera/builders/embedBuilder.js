import {
    EmbedBuilder
} from "discord.js";

/**
 * Build a Discord Embed from JSON
 */
export function buildEmbed(data = {}) {

    const embed = new EmbedBuilder();

    if (data.title)
        embed.setTitle(data.title);

    if (data.description)
        embed.setDescription(data.description);

    if (data.color)
        embed.setColor(data.color);

    if (data.url)
        embed.setURL(data.url);

    if (data.thumbnail)
        embed.setThumbnail(data.thumbnail);

    if (data.image)
        embed.setImage(data.image);

    if (data.author) {

        embed.setAuthor({
            name: data.author.name,
            iconURL: data.author.iconURL,
            url: data.author.url
        });

    }

    if (data.footer) {

        embed.setFooter({
            text: data.footer.text,
            iconURL: data.footer.iconURL
        });

    }

    if (Array.isArray(data.fields)) {

        embed.addFields(
            data.fields.map(field => ({
                name: field.name,
                value: field.value,
                inline: field.inline ?? false
            }))
        );

    }

    if (data.timestamp)
        embed.setTimestamp(
            data.timestamp === true
                ? new Date()
                : new Date(data.timestamp)
        );

    return embed;

}

export default buildEmbed;