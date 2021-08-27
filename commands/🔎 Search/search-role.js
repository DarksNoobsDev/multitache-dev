const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const color = require('../../settings/color.json')
const embed = require('../../settings/embed.json')
const { readdirSync } = require('fs')
const moment = require('moment')
const { GetRole } = require("../../functions/func")
module.exports.run = async (client, message, args) => {
  var role;
  if(args[0]) {
   try {
    role = await GetRole(message, args)
   } catch (e) {
    message.channel.send('Impossible de trouver le rôle...')
   }
  } else {
   return message.reply("<:no:833101993668771842> Réessayez en mettant la bonne id ou mentionnez-là !");
  }
  if(!role || role == null || role.id == null || !role.id) message.reply("<:no:833101993668771842> Je n'ai pas pu trouver le rôle")
  const embedinfo = new MessageEmbed()
  .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
  .setAuthor("Information à propos :   " + role.name, message.guild.iconURL({ dynamic: true }))
  .addField('**__❱ Nom :__**',`\`${role.name}\``,true)
  .addField('**__❱ ID :__**',`\`${role.id}\``,true)
  .addField('**__❱ Couleur :__**',`\`${role.hexColor}\``,true)
  .addField('**__❱ Date de créations :__**', "\`"+moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(role.createdAt).format("hh:mm:ss") + "\`",true)
  .addField('**__❱ Positions :__**',`\`${role.rawPosition}\``,true)
  .addField('**__❱ Nombre de personne ayant le rôle :__**',`\`${role.members.size}\``,true)
  .addField('**__❱ Le trie :__**',`\`${role.hoist ? "✔️" : "❌"}\``,true)
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .addField('**__❱ Mentionnable :__**',`\`${role.mentionable ? "✔️" : "❌"}\``,true)
  .addField('**__❱ Permissions donné :__**',`${role.permissions.toArray().map(p=>`\`${p}\``).join(", ") || "Aucune"}`)
  .setColor(role.hexColor)
  .setFooter(embed.embed.head.text)
  //send the EMBED
  message.channel.send({embeds: [embedinfo]})
}

module.exports.info = {
 name: "searchrole",
 aliases: ["search-role", "roleinfo"],
 category: "🔎 Search",
 description: "Cherche le rôle dans serveur et affiche son information ect...",
 usage: "searchrole <roleid>",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}