const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('think')
        .setDescription('sp is thinking...'),
    async execute(bot, interaction) {
        await interaction.deferReply();
    }
}