const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
const options = require('../../settings/settings.json')
module.exports.run = async (client, message, args) => {
const randomReponses = Math.floor(Math.random() * 5648);
 message.channel.sendTyping()
 message.reply(`Que dis-tue de **${randomReponses}** ?`)
}

module.exports.info = {
 name: "randomnum",
 aliases: ["gen-num", "generate-random-numero"],
 category: "🏓 Fun",
 description: "Génère un nombre alléatoire.",
 usage: "randomnum",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}