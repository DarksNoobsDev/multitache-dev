const { MessageEmbed } = require("discord.js")
const color = require('../../settings/color.json')
module.exports.run = async (client, message, args) => {
  client.destroy(require('../../settings/config.json').token)
}

module.exports.info = {
 name: "stopbot",
 aliases: ["stopb", "stopbot", "stop-bot"],
 category: "👑 Owner",
 description: "Permet au owner de stoper le bot facilement",
 usage: "stop",
 permissions: ["ADMINISTRATOR"],
 needOwner: true,
 status: "100% 🟢"
}