const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wikipedia')
        .setDescription('Get a Wikipedia article')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Search query')
                .setRequired(true)),
    async execute(bot, interaction) {
        try {
            await interaction.deferReply();
            const query = encodeURIComponent(interaction.options.getString('query'));
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                const embed = new Discord.MessageEmbed()
                    .setColor('#3498db') 
                    .setTitle(data.title)
                    .setDescription(data.extract.length > 2000 ? data.extract.slice(0, 1997) + '...' : data.extract)
                    .setURL(data.content_urls.desktop.page)
                    .setFooter("click the title to view full article");

                await interaction.editReply({ embeds: [embed] });
            } else {
                await interaction.editReply(`No results`);
            }
        } catch (error) {
            console.error(error);
            await interaction.channel.send('error');
        }
    },
};
