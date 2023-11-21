const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('filter')
        .setDescription('Add a filter to images')
        .addStringOption(option => option.setName('image').setDescription('Image URL').setRequired(true))
        .addStringOption(option => option.setName('type').setDescription('The type of filter').setRequired(true)
            .addChoices(
                { name: 'Blue', value: 'blue' },
                { name: 'Red', value: 'red' },
                { name: 'Green', value: 'green'},
                { name: 'Blurple', value: 'blurple'},
                { name: 'Blurple 2', value: 'blurple2'},
                { name: 'Greyscale', value: 'greyscale'},
                { name: 'Invert', value: 'invert'},
                { name: 'Sepia', value: 'sepia'},
                { name: 'Threshold', value: 'threshold'},
            )),
    async execute(bot, interaction) {
        const image = interaction.options.getString('image');
        const type = interaction.options.getString('type');
        try {
            await interaction.deferReply();
            const url = `https://some-random-api.com/canvas/filter/${type}?avatar=${image}`

            const res = await fetch(url);
            const response = await res.buffer();

            const attachment = new MessageAttachment(response, 'img.png');

            const embed = new MessageEmbed()
                .setImage('attachment://img.png');

            interaction.editReply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
        }
    },
};
