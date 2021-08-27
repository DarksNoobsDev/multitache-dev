const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const color = require('../../settings/color.json')
const { readdirSync } = require('fs')
const moment = require('moment')
module.exports.run = async (client, message, args) => {
  /* Constantes */
  // Flags
  const flags = {
    DISCORD_EMPLOYEE: 'EMPLOYER DE DISCORD',
    DISCORD_PARTNER: 'PARTENAIRE DISCORD',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Niv 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Niv 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'SUPPORTEUR',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'BOT VERIFIER',
    VERIFIED_DEVELOPER: 'DEVELOPPEURS BOT VERIFIE'
  };
  // Status
  const statuses = {
    "online" : "🟢",
    "idle" : "🟠",
    "dnd" : "🔴",
    "offline" : "⚫️",
  }
  /* End */
 
  const member = message.guild.members.cache.get(args[0] || message.author.id);
  const EmbedErr = new MessageEmbed()
  .setTitle(`Impossible de trouvé l'id ou le nom de la personne demandés \n${args[0]}`, true)
  .setColor(color.red)
  if(!member) return message.reply({embeds: [EmbedErr]});
  const userFlags = member.user.flags.toArray()
  const Embed = new MessageEmbed()
  .setTitle(`**__Profil de :__** ${member.user.username}`)
  .setColor(color.orange)
  .addField(`**__❱ Pseudo :__**`, `${member.user.username}#${member.user.discriminator}`, true)
  .setTimestamp()
  .setThumbnail(member.user.avatarURL())
  .setFooter(`${require("../../settings/embed.json").embed.head.text}`)
  .addField(`**__❱ Id :__**`, `${member.user.id}`, true)
  .addField(`**__❱ Un bot :__**`, `${member.user.bot ? ":white_check_mark:" : "❌"}`, true)
  .addField(`**__❱ Badge :__**`, `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun badge'}`, true)
  .addField(`**__❱ Avatar :__**`, `[\`Lien de l'avatar\`](${member.user.avatarURL({ format: "png", dynamic: true })})`,true)
  .addField(`**__❱ Date de créations du comptes : :__**`, "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
  .addField(`**__❱ Rejoins le serveur discord le : :__**`, "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",false)
  .setImage(member.user.avatarURL())
  message.channel.send({ embeds: [Embed] })
  
}

module.exports.info = {
 name: "searchuser",
 aliases: ["searchuser", "searchuserinserver", "userinfo"],
 category: "🔎 Search",
 description: "Cherche la personne dans le même serveur et affiche son information ect...",
 usage: "searchuser <user_id>",
 permissions: ["SEND_MESSAGES"],
 status: "99% 🟢"
}