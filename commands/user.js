const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Shows info about your account"),
  async execute(interaction) {
    const user = interaction.user;

    const embed = new EmbedBuilder()
      .setColor(0x2ECC71)
      .setTitle("🙋 User Info")
      .setThumbnail(user.displayAvatarURL({ size: 1024 }))
      .addFields(
        { name: "Username", value: user.tag, inline: true },
        { name: "ID", value: user.id, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
