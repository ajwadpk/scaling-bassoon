const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Shows detailed info about a user")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The user to get info about")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target") || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    // Account creation & join dates
    const createdAt = `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`;
    const joinedAt = `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`;

    // Roles (excluding @everyone)
    const roles = member.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => r.toString())
      .join(", ") || "None";

    const embed = new EmbedBuilder()
      .setColor(0x2ECC71)
      .setTitle(`🙋 User Info: ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 1024, dynamic: true }))
      .addFields(
        { name: "🆔 ID", value: user.id, inline: true },
        { name: "🏷️ Tag", value: user.tag, inline: true },
        { name: "📆 Account Created", value: createdAt, inline: false },
        { name: "📥 Joined Server", value: joinedAt, inline: false },
        { name: "🎭 Roles", value: roles, inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
