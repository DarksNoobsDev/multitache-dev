const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const info = require('../../settings/info.json')
const { duration } = require('../../functions/func.js')
const color
 = require('../../settings/color.json')
const { readdirSync } = require('fs')
const moment = require('moment')
const CategoryList = readdirSync("./commands")
module.exports.run = async (client, message, args) => {
 const Embed = new MessageEmbed()
 .setTitle(`**__Info du bot :__** ${client.user.username}`)
 .setDescription(`Salut, je suis un bot 100% français, multi-service prêt a être déployer (Enfin, presque) et n'utilise pas de l'élétricité (J'utilise des panneaux solaires LOL).\n\nJ'ai plus de **${client.commands.size - 2}** dont **${CategoryList.length}** catégories.`)
 .setColor(color.orange)
 .addField(`**__❱ Pseudo :__**`, `${client.user.username}#${client.user.discriminator}`, true)
 .setTimestamp()
 .setThumbnail(client.user.avatarURL())
 .setFooter(`${require("../../settings/embed.json").embed.head.text} (Pour voir les crédits du bot, tapez ${defaultPrefix}credit. Et pour les demandes de partenariats ou voir nos partenaires, tapez ${defaultPrefix}partener).`)
 .addField(`**__❱ Id :__**`, `${client.user.id}`, true)
 .addField(`**__❱ Dévéloppeurs :__**`, `<@${info.ownerIds}> \n${info.ownerPseudo.join(", ")}`, true)
 .addField(`**__❱ Avatar :__**`, `[\`Lien de l'avatar\`](${client.user.avatarURL({ format: "png", dynamic: true })})`,true)
 .addField(`**__❱ En ligne depuis :__**`, `${duration(client.uptime)}`,true)
 .addField(`**__❱ Avec :__**`, `**${client.commands.size}** commandes, et **${CategoryList.length}** catégories!`,true)
 .addField(`**__❱ Discord officiel :__**`, `[\`Lien du discord\`](https://discord.gg/2wDu9z2TeJ)`,true)
 .addField(`**__❱ Date de créations du bot : :__**`, "\`"+moment(client.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(client.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
 .addField(`**__❱ Rejoins le serveur discord le : :__**`, "\`"+moment(client.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(client.user.joinedTimestamp).format("hh:mm:ss")+ "\`",false)
 message.channel.send({ embeds: [Embed] })
}

module.exports.info = {
 name: "botinfo",
 aliases: ["b-info", "b-stats", "bot-stat", "botstat", "bot-info"],
 category: "ℹ Informations",
 description: "Affiche l'informations du bot.",
 usage: "bot-info",
 permissions: ["SEND_MESSAGES"],
 status: "99% 🟢"
}