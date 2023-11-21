const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Chat with GPT')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The text prompt')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Show response as "Only you can see this message"')
                .setRequired(false)),
    async execute(bot, interaction) {
        const ephe = interaction.options.getBoolean('ephemeral') || false;
        try {
            const start = new Date();
            await interaction.deferReply();
            const prompt = interaction.options.getString('prompt');
            const url = 'https://www.chad-gpt.ai/api/generate';

            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ prompt }), });

            const text = await response.text();
            const end = new Date();
            const embed = new MessageEmbed()
                .setDescription("```" + text + "```")
                .setFooter(`took ${end - start} ms`)

            await interaction.editReply({ embeds: [embed], ephemeral: ephe || false });
        } catch (error) {
            console.error(error);
        }
    },
};
