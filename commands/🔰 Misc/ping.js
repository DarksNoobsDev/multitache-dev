const { MessageEmbed } = require("discord.js")
const { defaultPrefix: prefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
const color = require('../../settings/color.json')
const CategoryList = readdirSync("./commands")

module.exports.run = async (client, message, args) => {
  const Embed = new MessageEmbed()
  .setTitle(`🏓Pong, ${client.ws.ping} ms!`)
  .setColor(color.orange)
  message.channel.send({ embeds: [Embed] })
}

module.exports.info = {
 name: "ping",
 aliases: ["pong", "test", "speed-ping"],
 category: "🔰 Misc",
 usage: "ping",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}