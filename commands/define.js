const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Look up a word')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The term to look up')
                .setRequired(true)),
    async execute(bot, interaction) {
        try {
            await interaction.deferReply();
            const term = interaction.options.getString('term');
            const url = `https://some-random-api.com/others/dictionary?word=${encodeURIComponent(term)}`;

            const response = await fetch(url);
            const data = await response.json();

            const embed = new MessageEmbed()
            .setTitle(`${data.word}`)
            .setDescription(`${data.definition}`);
            interaction.editReply({embeds:[embed]})
        } catch (error) {
            console.error(error);
        }
    },
};
