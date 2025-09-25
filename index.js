require("dotenv").config();
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Keep Render happy (dummy HTTP server)
const http = require("http");
http.createServer((req, res) => res.end("Bot is running")).listen(process.env.PORT || 3000);

if (!process.env.TOKEN) {
  console.error("❌ No bot token found! Did you set TOKEN in env vars?");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, c => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "⚠️ Error executing this command.", ephemeral: true });
  }
});

client.login(process.env.TOKEN);