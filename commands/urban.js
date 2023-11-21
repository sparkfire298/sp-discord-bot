const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Look up a term on Urban Dictionary')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The term to look up')
                .setRequired(true)),
    async execute(bot, interaction) {
        try {
            const term = interaction.options.getString('term');
            const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.list && data.list.length > 0) {
                const result = data.list[0];

                const embed = new MessageEmbed()
                    .setTitle(result.word)
                    .setDescription(result.definition)
                    .addField('Example', '*'+result.example || "None"+'*')//someone please fix my shitty formatting
                    .setFooter(`by ${result.author}\n👍 ${result.thumbs_up.toLocaleString()} 👎 ${result.thumbs_down.toLocaleString()}`);

                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply(`Word not found`);
            }
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred');
        }
    },
};
