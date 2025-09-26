const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a dice (1-6)"),
  async execute(interaction) {
    const roll = Math.floor(Math.random() * 6) + 1;

    const embed = new EmbedBuilder()
      .setColor(0xE74C3C)
      .setTitle("🎲 Dice Roll")
      .setDescription(`You rolled a **${roll}**!`);

    await interaction.reply({ embeds: [embed] });
  },
};
