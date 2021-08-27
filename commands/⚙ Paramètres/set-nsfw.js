const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
module.exports.run = async (client, message, args) => {
 if(!args.length) return message.reply(`Veuilliez entrer un id de salon valides et non vides !`);
 const channelArgs = args[0]
 const channelByFetch = client.channels.cache.get(args[0])
  if(!channelByFetch) return message.reply(`Veuilliez entrer un id de salon valides !`);
  if(channelByFetch.isVoice()) return message.reply(`Veuilliez mettre un salon textuelle !`)
  if(channelByFetch.isThread()) return message.reply(`Veuilliez mettre un salon textuelle !`)
  
  if(channelByFetch.nsfw) {
   channelByFetch.setNSFW(false)
   message.reply(`Le salon a été transformer en salon SFW (Safe for work) !`)
  } else {
   channelByFetch.setNSFW(true)
   message.reply(`Le salon a été transformer en salon NSFW🔞 (Not safe for work) !`)
  }
}

module.exports.info = {
 name: "set-nsfw",
 aliases: ["set-nsfw", "set-nsfw", "set-channel-nsfw"],
 category: "⚙ Paramètres",
 description: "Définir un salon en tant que salon NSFW.",
 usage: "set-nsfw [channel]",
 permissions: ["MANAGE_GUILD"],
 status: "99% 🟢"
}