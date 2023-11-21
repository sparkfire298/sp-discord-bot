const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
}
// Prevent errors taking the process offline
process.on('unhandledRejection', (error) => {
	console.error('Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
});
// End prevent
bot.once('ready', () => {
	console.log('Ready!');
	bot.user.setActivity(`/help - ${bot.commands.size} commands`);
	bot.user.setStatus("dnd");
});


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(bot, interaction);
	} catch (error) {
		console.error(error);
		const mg = await interaction.channel.send({ content: `${interaction.user}, an error occurred!` });
		// More very advanced error handling wowowowow
		setTimeout(function () { mg.delete(); }, 2000)
	}
});

bot.login(token);