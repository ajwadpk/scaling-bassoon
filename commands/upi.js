const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upi")
    .setDescription("Get the UPI payment QR code"),
  async execute(interaction) {
    const upiImage = "https://cdn.discordapp.com/attachments/1399760635268567124/1421366315028844554/20250927_105128.jpg?ex=68d8c609&is=68d77489&hm=272e088ef6d3e4660de0c3f16876353af5eaff242b720264c45acb7bddc91e44&";

    const embed = new EmbedBuilder()
      .setColor(0x1ABC9C)
      .setTitle("📲 UPI Payment")
      .setDescription("Scan the QR code below to pay via UPI:")
      .setImage(upiImage)
      .setFooter({ text: "UPI Payment QR" });

    await interaction.reply({ embeds: [embed] });
  },
};
