const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Shows info about this server"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("📊 Server Info")
      .addFields(
        { name: "🏠 Server Name", value: interaction.guild.name, inline: true },
        { name: "👥 Members", value: `${interaction.guild.memberCount}`, inline: true }
      )
      .setThumbnail(interaction.guild.iconURL({ size: 1024 }));

    await interaction.reply({ embeds: [embed] });
  },
};
