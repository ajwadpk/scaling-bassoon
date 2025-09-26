const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isOwner = require("../utils/isOwner");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("🔒 Shut down the bot (Owner only)"),
  async execute(interaction) {
    if (!isOwner(interaction.user.id)) {
      return interaction.reply({ content: "❌ You are not allowed to use this command.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0xE74C3C)
      .setTitle("⚠️ Bot Shutdown")
      .setDescription("The bot is shutting down...");

    await interaction.reply({ embeds: [embed] });
    process.exit(0);
  },
};
