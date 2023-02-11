const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;

const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`);
    }
}

client.once(Events.ClientReady, c => {
    console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(TOKEN);


client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0];
        if (selected.toLowerCase() == "javascript")
            await interaction.reply("Documentação do JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript");
        else if (selected.toLowerCase() == "python")
            await interaction.reply("Documentação do python: https://www.python.org");
            else if (selected.toLowerCase() == "Java")
            await interaction.reply("Documentação do Java: https://docs.oracle.com/en/java/");
            else if (selected.toLowerCase() == "discordjs")
            await interaction.reply("Documentação do discordjs: https://discord.js.org/#/docs/discord.js/main/general/welcome");
    }

    if (!interaction.isChatInputCommand()) return console.log(interaction);
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error("Comando não encontrado!");
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply("Houve um erro ao executar este comando!");
    }
});