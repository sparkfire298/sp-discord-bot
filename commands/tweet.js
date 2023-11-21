const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tweet')
        .setDescription('Generate a fake tweet')
        .addStringOption(option => option.setName('text').setDescription('Tweet text').setRequired(true))
        .addStringOption(option => option.setName('displayname').setDescription('Display name').setRequired(true))
        .addStringOption(option => option.setName('username').setDescription('Username').setRequired(true))
        .addStringOption(option => option.setName('avatar').setDescription('Avatar URL').setRequired(true))
        .addIntegerOption(option => option.setName('likes').setDescription('Tweet likes'))
        .addIntegerOption(option => option.setName('retweets').setDescription('Retweets'))
        .addIntegerOption(option => option.setName('replies').setDescription('Replies'))
        .addStringOption(option => option.setName('theme').setDescription('The theme').addChoices({ name: 'Light', value: 'light' }, { name: 'Dark', value: 'dark' },)),
    async execute(bot, interaction) {
        const text = interaction.options.getString('text');
        const displayname = interaction.options.getString('displayname');
        const username = interaction.options.getString('username');
        const avatar = interaction.options.getString('avatar');
        const likes = interaction.options.getInteger('likes') || 6969;
        const retweets = interaction.options.getInteger('retweets') || 420;
        const replies = interaction.options.getInteger('replies') || 1;
        const theme = interaction.options.getString('theme') || "dark";
        try {
            await interaction.deferReply();
            const url = `https://some-random-api.com/canvas/misc/tweet?avatar=${avatar}&comment=${text}&displayname=${displayname}&username=${username}&theme=${theme}&likes=${likes}&retweets=${retweets}&replies=${replies}`

            const res = await fetch(url);
            const response = await res.buffer();

            const attachment = new MessageAttachment(response, 'tweet.png');

            const embed = new MessageEmbed()
                .setImage('attachment://tweet.png');

            interaction.editReply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
        }
    },
};
