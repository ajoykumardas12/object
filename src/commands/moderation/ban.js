const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  Client,
} = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a member form this server.",
  //   devOnly: Boolean,
  //   testOnly: Boolean,
  //   deleted: Boolean
  options: [
    {
      name: "target-user",
      description: "The user to ban.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "The reason for banning.",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],

  /**
   *
   * @param {Client} client
   * @param {Client} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You can't ban the server owner.");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't ban that user because they have same or higher role than you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't ban that user because they have same or higher role than me."
      );
      return;
    }

    //ban
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `${targetUser} was banned.\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error while banning: ${error}`);
    }
  },
};
