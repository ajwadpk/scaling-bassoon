const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isOwner = require("../utils/isOwner");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Run JavaScript code (Owner only)")
    .addStringOption(option =>
      option.setName("code")
        .setDescription("The code to evaluate")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!isOwner(interaction.user.id)) {
      return interaction.reply({ content: "❌ You are not allowed to use this command.", ephemeral: true });
    }

    const code = interaction.options.getString("code");

    try {
      let result = eval(code);
      if (typeof result !== "string") result = require("util").inspect(result);

      const embed = new EmbedBuilder()
        .setColor(0x2ECC71)
        .setTitle("✅ Eval Result")
        .setDescription("```js\n" + result + "\n```");

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      const embed = new EmbedBuilder()
        .setColor(0xE74C3C)
        .setTitle("❌ Eval Error")
        .setDescription("```js\n" + err + "\n```");

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
