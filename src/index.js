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

client.login(process.env.LOGIN_TOKEN);
