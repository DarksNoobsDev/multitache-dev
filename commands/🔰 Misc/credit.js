const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const info = require('../../settings/info.json')
const color
 = require('../../settings/color.json')
const { readdirSync } = require('fs')
const moment = require('moment')
module.exports.run = async (client, message, args) => {
 const Embed = new MessageEmbed()
  .setTitle(`:regional_indicator_s: :regional_indicator_o: :regional_indicator_o: :regional_indicator_n: !!!`)
  .setColor(color.orange)
  .setTimestamp()
  .setThumbnail(message.author.avatarURL())
  .setFooter(`${require("../../settings/embed.json").embed.head.text}`)
 message.channel.send({ embeds: [Embed] })
}

module.exports.info = {
 name: "credit",
 aliases: ["all-sponsors", "sponsors", "c-all"],
 category: "🔰 Misc",
 description: "Affiche l'informations du bot.",
 usage: "credit",
 permissions: ["SEND_MESSAGES"],
 status: "2% 🟢"
}