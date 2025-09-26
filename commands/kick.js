const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The user to kick")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for kicking")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = await interaction.guild.members.fetch(target.id);

    if (!member.kickable) {
      return interaction.reply({ content: "❌ I cannot kick this user.", ephemeral: true });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor(0xE67E22)
      .setTitle("👢 Member Kicked")
      .addFields(
        { name: "User", value: `${target.tag}`, inline: true },
        { name: "Reason", value: reason, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
