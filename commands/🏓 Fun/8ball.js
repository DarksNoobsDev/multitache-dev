const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
const options = require('../../settings/settings.json')
module.exports.run = async (client, message, args) => {
 if(!args.length) return message.reply(`Veuilliez poser une question...`)
	const randomReponses = Math.floor(Math.random() * options["8ballréponses"].length);
 const channel = message.channel;
 channel.sendTyping()
 await message.channel.send(options["8ballréponses"][randomReponses])
}

module.exports.info = {
 name: "8ball",
 aliases: ["8ball", "répond", "question"],
 category: "🏓 Fun",
 description: "Répond a une question demandé par la personne!",
 usage: "8ball [question]",
 permissions: ["SEND_MESSAGES"],
	status: "100% 🟢"
}