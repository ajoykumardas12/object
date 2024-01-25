require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
    name: "ping",
    description: "Replies with pong",
  },
  {
    name: "pingpong",
    description: "Sends GIF",
  },
  {
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "first-number",
        description: "The first number",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "One",
            value: "1",
          },
          {
            name: "Two",
            value: "2",
          },
          {
            name: "Three",
            value: "3",
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

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
