/*
    Since the bot doesn't have the members intent enabled, it is pretty hard to access info.
    So, I use JAPI.rest. If you plan on self hosting, and using intents, you will need to adjust this accordingly.
*/
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get information about a Discord user')
        .addStringOption(option =>
            option.setName('user_id')
                .setDescription('Discord user ID')
                .setRequired(true)),
    async execute(bot, interaction) {
        try {
            const id = encodeURIComponent(interaction.options.getString('user_id')) || interaction.member.id;
            const url = `https://japi.rest/discord/v1/user/${id}`;

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                const user = data.data;
                const presence = data.presence;
                const name2 = user.discriminator === '0' ? `@${user.username}` : `${user.username}#${user.discriminator}`;

                const embed = new Discord.MessageEmbed()
                    .setColor('#3498db')
                    .setAuthor(`${name2}`, user.avatarURL)
                    .setThumbnail(user.avatarURL)
                    .addField('User ID', user.id)
                    .addField('Username', user.username)
                    .addField('Discriminator', `${user.discriminator || "[[Has handle]](https://discord.com/blog/usernames)"}`)
                    .addField('Joined discord', new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
                    .setFooter("If the discriminator is 0, they have a username.\nhttps://discord.com/blog/usernames");

                    if (user.bannerURL) {
                        embed.setImage(user.bannerURL+"?size=4096")
                    }

                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply(`Couldn't find any info`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply(`Couldn't find any properties`);
        }
    },
};
