const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say something")
    .addStringOption(option =>
      option.setName("message")
        .setDescription("The message to repeat")
        .setRequired(true)
    ),
  async execute(interaction) {
    const msg = interaction.options.getString("message");

    const embed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle("💬 Message")
      .setDescription(msg);

    await interaction.reply({ embeds: [embed] });
  },
};
