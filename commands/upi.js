const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upi")
    .setDescription("Get the UPI payment QR code"),
  async execute(interaction) {
    const upiImage = "https://cdn.discordapp.com/attachments/1399760635268567124/1421115648557191168/Screenshot_20250923_223354_FamApp.jpg?ex=68d7dc95&is=68d68b15&hm=5c189337b166906f93321aff3eeb726ffd599d00715076c15bab68c25a70c93e&";

    const embed = new EmbedBuilder()
      .setColor(0x1ABC9C)
      .setTitle("📲 UPI Payment")
      .setDescription("Scan the QR code below to pay via UPI:")
      .setImage(upiImage)
      .setFooter({ text: "UPI Payment QR" });

    await interaction.reply({ embeds: [embed] });
  },
};
