const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a number of messages from a channel")
    .addIntegerOption(option =>
      option.setName("amount")
        .setDescription("Number of messages to delete (1–100)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: "❌ You must specify between 1 and 100 messages.", ephemeral: true });
    }

    await interaction.channel.bulkDelete(amount, true);

    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setTitle("🧹 Messages Cleared")
      .setDescription(`Deleted **${amount}** messages from ${interaction.channel}`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
