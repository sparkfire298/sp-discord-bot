const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('get a very funny joke'),
    async execute(bot, interaction) {
        try {
            const url = `https://some-random-api.com/others/joke`;
            const response = await fetch(url);
            const data = await response.json();
            interaction.reply(`${data.joke}`);
        } catch (error) {
            console.error(error);
        }
    },
};
