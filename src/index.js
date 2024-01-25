require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

let botName = "";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is ready to Objectify 🐱‍💻`);
  botName = c.user.username;
});

client.on("messageCreate", (message) => {
  if (message.content === `hello ${botName}`) {
    message.reply(`hello ${message.author.displayName}`);
  }
  console.log(message.author);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("hey");
  }
  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }
  if (interaction.commandName === "pingpong") {
    interaction.reply("https://media.giphy.com/media/s1oqCh5n0IwBa/giphy.gif");
  }
  if (interaction.commandName === "add") {
    const num1 = Number(interaction.options.get("first-number")?.value);
    const num2 = Number(interaction.options.get("second-number")?.value);

    interaction.reply(`The sum is ${num1 + num2}`);
  }

  console.log(interaction.commandName);
});

client.login(process.env.LOGIN_TOKEN);
