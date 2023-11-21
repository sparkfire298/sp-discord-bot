const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

function gen(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:\',.<>?/';
    let password = "";
    for (let i = 0; i < length; i++) {
        const gx = Math.floor(Math.random() * charset.length);
        password += charset.charAt(gx);
    }
    return password;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('password')
        .setDescription('Generate a password')
        .addIntegerOption(option =>
            option.setName('length')
                .setDescription('Length of the password')
                .setRequired(false)),
    async execute(bot, interaction) {
        try {
            const length = interaction.options.getInteger('length') || 10;

            if (length > 90) {
                return await interaction.reply("The maximum length is 90");
            }

            const password = generatePassword(length);
                

            await interaction.reply({ content: "Here is your password:\n```"+password+"```\nLength: "+length, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply('Error. This rarely happens, so [please report it.](https://sparkfire298.xyz/contact)');
        }
    },
};
