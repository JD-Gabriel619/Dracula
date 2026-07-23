import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Create a self-role panel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)

        .addStringOption(option =>
            option
                .setName('title')
                .setDescription('Panel title')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Panel description')
                .setRequired(true)
        ),

    category: 'Roles',

    async execute(interaction) {

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');

        const embed = new EmbedBuilder()
            .setColor(0x8A2BE2)
            .setTitle(title)
            .setDescription(description)
            .setFooter({
                text: 'Click the buttons below to toggle your roles.'
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('panel_setup')
                    .setLabel('➕ Add Role Button')
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId('panel_publish')
                    .setLabel('📤 Publish')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('panel_cancel')
                    .setLabel('❌ Cancel')
                    .setStyle(ButtonStyle.Danger)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });

    }
};