const mongoose = require('mongoose')
const { Guild } = require('../../functions/models/export')
const { CreateGuild } = require('../../functions/func')
const { MessageEmbed } = require('discord.js')
module.exports = async (client, guild) => {
 const NewGuild = {
  guildId: guild.id,
  guildName: guild.name
 }
 
CreateGuild(NewGuild)
 const ownerId = guild.ownerId;
 const Embed = new MessageEmbed()
 .setAuthor(client.users.cache.get(ownerId).username, client.users.cache.get(ownerId).avatarURL())
 .setFooter(require('../../settings/embed.json').embed.head.text)
 .addField(`**__> Nom du serveur :__**`, `${guild.name}`, true)
 .setColor(client.color.green)
 .addField(`**__> Créateur du serveur :__**`, `${client.users.cache.get(ownerId).username}`, true)
 .setDescription(`Nous le remmercions d'avoir inviter notre bot🤗.`)
 client.channels.cache.get('883030875682529381').send({ embeds: [Embed] })
}