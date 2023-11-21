const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('animal')
        .setDescription('Get an animal picture')
        .addStringOption(option => option.setName('animal').setDescription('The animal').setRequired(true)
            .addChoices(
                { name: 'Bird', value: 'bird' },
                { name: 'Cat', value: 'cat' },
                { name: 'Dog', value: 'dog'},
                { name: 'Fox', value: 'fox'},
                { name: 'Kangaroo', value: 'kangaroo'},
                { name: 'Koala', value: 'koala'},
                { name: 'Panda', value: 'panda'},
                { name: 'Raccoon', value: 'raccoon'},
                { name: 'Red Panda', value: 'red_panda'},
            )),
    async execute(bot, interaction) {
        const type = interaction.options.getString('animal');
        try {
            await interaction.deferReply();
            const url = `https://some-random-api.com/animal/${type}`

            const res = await fetch(url);
            const response = await res.json();

            const embed = new MessageEmbed()
                .setImage(`${response.image}`)
                .setDescription(`${response.fact}`);

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    },
};