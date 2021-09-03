const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
module.exports.run = async (client, message, args) => {
  message.delete()
  if(!args.length) return message.reply(`Le bot ne peut pas envoyer un message vide.`)
  message.channel.send({ content: args.join(" ") })
}

module.exports.info = {
 name: "say",
 aliases: ["rep", "reapeat"],
 category: "🏓 Fun",
 description: "Permet de faire redire le bot un message",
 usage: "say [message]",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}