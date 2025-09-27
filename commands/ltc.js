const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ltc")
    .setDescription("Get the Litecoin wallet address"),
  async execute(interaction) {
    const ltcAddress = "ltc1qfc4dye659d8c3qqzlepv4uhx23wz6x0r830nqk";
    const qrImage = "https://cdn.discordapp.com/attachments/1399760635268567124/1421366324952567989/20250927_105039.jpg?ex=68d8c60b&is=68d7748b&hm=04f069632514a67c02bb57df3d5af8105090576c5cbd43413a0a519684543f1d&";

    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setTitle("💰 Litecoin Wallet")
      .setDescription(`Here’s the address to send **LTC**:\n\`\`\`${ltcAddress}\`\`\``)
      .setImage(qrImage)
      .setFooter({ text: "Use this address to send Litecoin" });

    await interaction.reply({ embeds: [embed] });
  },
};
