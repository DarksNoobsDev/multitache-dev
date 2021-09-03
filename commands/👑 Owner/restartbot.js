const { MessageEmbed } = require("discord.js")
const color = require('../../settings/color.json')
module.exports.run = async (client, message, args) => {
  client.destroy(require('../../settings/config.json').token)
  client.login(require('../../settings/config.json').token)
  message.reply(`Reddémarage avec succès ! Le bot fonctionnes maintenant.`)
}

module.exports.info = {
 name: "restartbot",
 aliases: ["restartb", "r-bot", "restart-bot"],
 category: "👑 Owner",
 description: "Permet au owner de reddémarrer le bot facilement",
 usage: "stop",
 permissions: ["ADMINISTRATOR"],
 needOwner: true,
 status: "100% 🟢"
}