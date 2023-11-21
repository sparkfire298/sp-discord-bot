const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { version: discordVersion } = require('discord.js/package.json');
const { version: nodeVersion, memoryUsage, uptime } = process;

function formatBytes(bytes) {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));

    return Math.round(100 * (bytes / Math.pow(k, i))) / 100 + ' ' + sizes[i];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('yes'),
    async execute(bot, interaction) {
        try {

            const invite = new MessageButton()
                .setStyle('LINK')
                .setLabel('Invite')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=1175387898766446592&permissions=120463878144&scope=bot%20applications.commands');

            const github = new MessageButton()
                .setStyle('LINK')
                .setLabel('GitHub')
                .setURL('https://github.com/sparkfire298/sp');

            const website = new MessageButton()
                .setStyle('LINK')
                .setLabel('Website')
                .setURL('https://sparkfire298.xyz');

            const row = new MessageActionRow().addComponents(invite, github, website);

            const embed = new MessageEmbed()
                .setTitle("sp")
                .setDescription("**sp** is a utility bot by sparkfire298.")
                .addField('Node Version', nodeVersion, true)
                .addField('Discord.js Version', 'v'+discordVersion, true)
                .addField('Memory Usage', formatBytes(memoryUsage().heapUsed), true)
                .addField("Stats", `Servers: ${bot.guilds.cache.size}\nMembers: Unknown\nCommands: ${bot.commands.size}`);

            await interaction.reply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error(error);
            await interaction.reply(':x: Something happened!');
        }
    },
};
