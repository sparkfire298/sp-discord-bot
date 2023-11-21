const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('lolz'),
    async execute(bot, interaction) {
        try {
            const url = 'https://www.reddit.com/r/memes/random/.json';
            const response = await fetch(url);
            const data = await response.json();
            const meme = data[0]?.data.children[0]?.data;

            if (meme) {
                const embed = new MessageEmbed()
                    .setTitle(meme.title)
                    .setImage(meme.url_overridden_by_dest)
                    .setColor('#ff4500')
                    .setFooter("(if its a poop, its a video)"); 

                await interaction.reply({ embeds: [embed]});
            } else {
                await interaction.reply({ content: 'Error', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Error', ephemeral: true });
        }
    },
};
