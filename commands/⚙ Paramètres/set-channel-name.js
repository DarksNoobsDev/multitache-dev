const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
module.exports.run = async (client, message, args) => {
 if(!args.length) return message.reply(`Veuilliez entrer un id de salon valides et non vides !`);
 const channelArgs = args[0]
 const NameArgs = args.slice(1).join(" ")
 const channelByFetch = client.channels.cache.get(channelArgs)
  if(!channelByFetch) return message.reply(`Veuilliez entrer un id de salon valides !`);
  channelByFetch.setName(NameArgs)
  const Embed = new MessageEmbed()
  .setTitle(`Le salon/fils a bien été rennomé en __${NameArgs}__`)
  .setColor(require('../../settings/color.json').yellow)
  message.channel.send({ embeds: [Embed] })
}

module.exports.info = {
 name: "set-channel-name",
 aliases: ["set-channel-name", "set-name"],
 category: "⚙ Paramètres",
 description: "Rennomme un salon ou un fils discord.",
 usage: "set-channel-name [name]",
 permissions: ["MANAGE_GUILD"],
 status: "100% 🟢"
}