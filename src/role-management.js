require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

let botName = "";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1200287901691416618",
    label: "Pink",
  },
  {
    id: "1200288124387999824",
    label: "Sea",
  },
  {
    id: "1200288507780931715",
    label: "Red",
  },
  {
    id: "1200288623069757470",
    label: "Blue",
  },
];

client.on("ready", async (c) => {
  console.log(`${c.user.username} is ready to Objectify 🐱‍💻`);
  botName = c.user.username;

  try {
    const channel = await client.channels.cache.get(
      process.env.TESTING_CHANNEL_ID
    );
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Get or remove a role.",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.LOGIN_TOKEN);
