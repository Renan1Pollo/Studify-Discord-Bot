const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, Component } = require("discord.js");

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma linguagem selecionada")
            .addOptions(
                {
                    label: 'JavaScript',
                    description: 'Veja a documentação de JavaScript',
                    value: 'javascript',
                },
                {
                    label: 'Python',
                    description: 'Veja a documentação de Python',
                    value: 'Python',
                },
                {
                    label: 'Java',
                    description: 'Veja a documentação de Java',
                    value: 'java',
                },
                {
                    label: 'discordjs',
                    description: 'Veja a documentação de discord.js',
                    value: 'discordjs',
                },
            )
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação da tecnologia que quiser"),

    async execute(interaction) {
        await interaction.reply({ content: "Selecione uma das techs abaixo:", components: [row] });
    }
}
