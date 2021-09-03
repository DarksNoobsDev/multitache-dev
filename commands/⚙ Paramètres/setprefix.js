const { MessageEmbed } = require("discord.js")
const { defaultPrefix } = require('../../settings/config.json')
const { UpdateGuild } = require('../../functions/func')
const { readdirSync } = require('fs')
module.exports.run = async (client, message, args, settings) => {
 if(!args.length) return message.channel.send(`Le prefix sur le serveur est : \`\`\`${settings.prefix}\`\`\``);
 const newSettings = args[0]
 UpdateGuild(message.guild, { prefix: newSettings })
 return message.channel.send(`Le prefix du serveur été mis a jour en \`\`\`${newSettings}\`\`\``)
}

module.exports.info = {
 name: "setprefix",
 aliases: ["set-prefix", "set-p"],
 category: "⚙ Paramètres",
 description: "Modifie le prefix du bot.",
 usage: "set-prefix [NEW_PREFIX]",
 permissions: ["MANAGE_GUILD"],
 status: "99% 🟢"
}