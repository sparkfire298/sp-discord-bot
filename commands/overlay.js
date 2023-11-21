const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('overlay')
        .setDescription('Add an overlay to images')
        .addStringOption(option => option.setName('image').setDescription('Image URL').setRequired(true))
        .addStringOption(option => option.setName('type').setDescription('The type of overlay').setRequired(true)
            .addChoices(
                { name: 'Comrade', value: 'comrade' },
                { name: 'Rainbow', value: 'gay' }, // its not gay its rainbow, a gradient should not be confused
                { name: 'Glass', value: 'glass' },
                { name: 'Jail', value: 'jail' },
                { name: 'Mission Passed', value: 'passed' },
                { name: 'Triggered', value: 'triggered' },
                { name: 'Wasted', value: 'wasted' },
            )),
    async execute(bot, interaction) {
        const image = interaction.options.getString('image');
        const type = interaction.options.getString('type');
        try {
            await interaction.deferReply();
            const url = `https://some-random-api.com/canvas/overlay/${type}?avatar=${image}`

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