import {
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

const STYLE_MAP = {

    primary: ButtonStyle.Primary,
    secondary: ButtonStyle.Secondary,
    success: ButtonStyle.Success,
    danger: ButtonStyle.Danger,
    link: ButtonStyle.Link

};

function buildActionId(data) {

    if (!data.action)
        return "nocthera:unknown";

    switch (data.action) {

        case "verify":
            return "nocthera:verify";

        case "give_role":
            return `nocthera:give_role:${data.role}`;

        case "remove_role":
            return `nocthera:remove_role:${data.role}`;

        case "toggle_role":
            return `nocthera:toggle_role:${data.role}`;

        case "open_ticket":
            return "nocthera:ticket";

        case "captcha":
            return "nocthera:captcha";

        default:
            return `nocthera:${data.action}`;

    }

}

export function buildButton(data = {}) {

    const button = new ButtonBuilder();

    const style =
        STYLE_MAP[
            String(data.style || "primary").toLowerCase()
        ] ?? ButtonStyle.Primary;

    button.setStyle(style);

    if (style === ButtonStyle.Link) {

        button.setURL(data.url);

    } else {

        button.setCustomId(
            data.customId ??
            buildActionId(data)
        );

    }

    if (data.label)
        button.setLabel(data.label);

    if (data.emoji)
        button.setEmoji(data.emoji);

    if (data.disabled)
        button.setDisabled(true);

    return button;

}

export default buildButton;