const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Get information about the server'),
    async execute(bot, interaction) {
        try {
            if (!interaction.guild) {
                // For DMs
                return await interaction.reply(":x: This command only works in servers");
            }
            const guild = interaction.guild;

            const embed = new Discord.MessageEmbed()
                .setColor('#3498db') 
                .setTitle(`${guild.name}`)
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addField('ID', guild.id)
                .addField('Creation Date', new Date(guild.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
                .addField('Verification Level', guild.verificationLevel.toLowerCase());

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error while fetching server information.');
        }
    },
};
