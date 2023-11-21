const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Get a song lyrics')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The song title')
                .setRequired(true)),
    async execute(bot, interaction) {
        try {
            await interaction.deferReply();
            const title = interaction.options.getString('title');
            const url = `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(title)}`;

            const response = await fetch(url);
            const data = await response.json();
            if (data.error) return interaction.editReply("Nothing found");
             

            const embed = new MessageEmbed()
                .setTitle(`${data.title}`)
                .setDescription(`${data.lyrics}`)
                .setFooter(`by ${data.author}`)
                .setThumbnail(`${data.thumbnail.genius || 'https://assets.genius.com/images/default_avatar_300.png'}`)
                .setURL(`${data.links.genius}`);

            interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
        }
    },
};
