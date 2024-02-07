require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [];

const rest = new REST({ version: "10" }).setToken(process.env.LOGIN_TOKEN);

const registerCommands = async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log("Slash commands are registered");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

registerCommands();
