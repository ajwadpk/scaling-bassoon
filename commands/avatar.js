const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get your avatar or another user's avatar")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("The user whose avatar you want")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;

    const embed = new EmbedBuilder()
      .setColor(0xF1C40F)
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }));

    await interaction.reply({ embeds: [embed] });
  },
};
