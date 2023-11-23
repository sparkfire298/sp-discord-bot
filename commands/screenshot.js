const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

const filter = 'https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/block.txt';
const apikey = '';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('screenshot')
        .setDescription('Take a screenshot of a website')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The URL to capture')
                .setRequired(true)),
    async execute(bot, interaction) {
        try {
            const start = new Date();
            await interaction.deferReply();

            const url = interaction.options.getString('url');
            const checknsfw = interaction.channel?.nsfw || false;

            if (!checknsfw) {
                const txtget = await fetch(filter);
                const filters = await txtget.text();

                if (filters.includes(url)) {
                    return interaction.editReply(':no_entry: NSFW detected, please go to an NSFW channel.');
                }
            }

            const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            if (!regex.test(url)) {
                return interaction.editReply('Invalid URL.');
            }
            const end = new Date();

            const res = await fetch(`https://screenshot.abstractapi.com/v1/?api_key=${apikey}&url=${encodeURIComponent(url)}&width=1920&height=1080&capture_full_page=false`);
            const img = await res.buffer();

            const attachment = new MessageAttachment(img, 'screenshot.png');

            const embed = new MessageEmbed()
                .setTitle(`${url}`)
                .setImage('attachment://screenshot.png')
                .setFooter(`Took ${end - start} ms`);

            interaction.editReply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
        }
    },
};
