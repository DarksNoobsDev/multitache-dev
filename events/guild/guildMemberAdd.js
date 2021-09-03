const mongoose = require('mongoose')
const { Guild } = require('../../functions/models/export')
const { CreateUser } = require('../../functions/func')
const { MessageEmbed } = require('discord.js')
module.exports = async (client, member) => {
 if(member.user.bot) return;
 await CreateUser({
  guildId: member.guild.id,
  guildName: member.guild.name,
  userId: member.id,
  username: member.user.tag
 });
}