require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

let botName = "";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const bioEmbed = new EmbedBuilder()
  .setColor("Random")
  .setTitle("Bio")
  .setAuthor({ name: "Object" })
  .setDescription("The mighty bot")
  .setThumbnail("https://i.imgur.com/bn6Lvut.jpg")
  .addFields(
    {
      name: "Who?",
      value: "Bot, wannabe Assistant.",
    },
    {
      name: "What?",
      value: "Deep down I'm an Object, just like most things in JS.",
    },
    { name: "Do what?", value: "Reduce the gap between human and bot." }
  )
  .setImage("https://i.imgur.com/veT4S8V.jpg");

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

  if (interaction.commandName === "bio") {
    interaction.reply({ embeds: [bioEmbed] });
  }

  console.log(interaction.commandName);
});

client.login(process.env.LOGIN_TOKEN);
