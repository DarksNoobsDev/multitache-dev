const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const info = require('../../settings/info.json')
const color
 = require('../../settings/color.json')
const { readdirSync } = require('fs')
const moment = require('moment')
module.exports.run = async (client, message, args) => {
 const Embed = new MessageEmbed()
  .setTitle(`:regional_indicator_c: :regional_indicator_l: :regional_indicator_i: :regional_indicator_c: :regional_indicator_k:    :regional_indicator_i: :regional_indicator_c: :regional_indicator_i:`)
  .setURL("https://discord.gg/2wDu9z2TeJ")
  .setColor(color.orange)
 message.channel.send({ embeds: [Embed] })
}

module.exports.info = {
 name: "discord",
 aliases: ["d-link", "discord-link", "discord-l"],
 category: "ℹ Informations",
 description: "Affiche l'informations du bot.",
 usage: "bot-info",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}