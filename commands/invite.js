const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('invite'),
	async execute(bot, interaction) {
       interaction.reply(`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=35188704069904&scope=bot`)
	},
};