const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ltc")
    .setDescription("Get the Litecoin wallet address"),
  async execute(interaction) {
    const ltcAddress = "ltc1qfc4dye659d8c3qqzlepv4uhx23wz6x0r830nqk";
    const qrImage = "https://cdn.discordapp.com/attachments/1399760635268567124/1421115914367008928/image0.jpg?ex=68d7dcd5&is=68d68b55&hm=2b4d321d5228e639ee4d428faa974e44a7480c1d7449053ae9a16d1532149f7e&";

    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setTitle("💰 Litecoin Wallet")
      .setDescription(`Here’s the address to send **LTC**:\n\`\`\`${ltcAddress}\`\`\``)
      .setImage(qrImage)
      .setFooter({ text: "Use this address to send Litecoin" });

    await interaction.reply({ embeds: [embed] });
  },
};
