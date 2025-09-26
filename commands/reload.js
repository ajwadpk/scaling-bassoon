const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const isOwner = require("../utils/isOwner");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload a command file (Owner only)")
    .addStringOption(option =>
      option.setName("command")
        .setDescription("The command to reload")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!isOwner(interaction.user.id)) {
      return interaction.reply({ content: "❌ You are not allowed to use this command.", ephemeral: true });
    }

    const commandName = interaction.options.getString("command").toLowerCase();
    const commandPath = path.join(__dirname, `${commandName}.js`);

    if (!fs.existsSync(commandPath)) {
      return interaction.reply({ content: `❌ Command \`${commandName}\` not found.`, ephemeral: true });
    }

    delete require.cache[require.resolve(commandPath)];
    const newCommand = require(commandPath);

    interaction.client.commands.set(newCommand.data.name, newCommand);

    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setTitle("🔄 Command Reloaded")
      .setDescription(`Command \`${commandName}\` was reloaded successfully.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
