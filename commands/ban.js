const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The user to ban")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for banning")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "No reason provided";

    try {
      await interaction.guild.members.ban(target, { reason });

      const embed = new EmbedBuilder()
        .setColor(0xC0392B)
        .setTitle("🔨 Member Banned")
        .addFields(
          { name: "User", value: `${target.tag}`, inline: true },
          { name: "Reason", value: reason, inline: true }
        );

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: "❌ I cannot ban this user.", ephemeral: true });
    }
  },
};
