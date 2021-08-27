const { MessageEmbed } = require("discord.js")
const { defaultPrefix: prefix } = require('../../settings/config.json')
const { readdirSync } = require('fs')
const color = require('../../settings/color.json')
const CategoryList = readdirSync("./commands")

module.exports.run = async (client, message, args) => {
 if(!args.length) {
   const Embed = new MessageEmbed()
   .setColor(require("../../settings/color.json").yellow)
   .setTitle(`🔰 ${client.user.username} | Page d'aide du bot.`)
   .setDescription(`Affiche toute une liste de commandes avec leurs catégories. \n__PS :__ Utiliser ${prefix}help <command_name> pour + d'info.`)
   .setFooter(`Syntax <> = non optinnel et [] = requis.`, message.author.avatarURL({ dynamic: true }))
   .setThumbnail(client.user.avatarURL({ dynamic: true }))
   for(const category of CategoryList) {
     const FilteredCmd = client.commands.filter(cat => cat.info.category === category).map(cmd => cmd.info.name).join(',  ')
     const FilteredCmdNumber = client.commands.filter(cat => cat.info.category === category).size;
    Embed.addField(
     `**${category}** [${FilteredCmdNumber}]`,
     `> \`${FilteredCmd}\``
    )
   }
   message.channel.send({ embeds: [Embed] })
 
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(args[0]));
    if(!command) return message.channel.send(`La commande en question : ${args[0]} n'existe pas. \nSi vous voulez donner des suggections, regarder ma bio, et contactez mon owner.`)
    const Embed = new MessageEmbed()
    .setTitle(`**${command.info.name.toLocaleUpperCase()}**`, false)
    .setDescription(`**__Description :__** ${command.info.description || "Aucune description trouvé pour cette commande !"}\n`)
    if(command.info.status) {
      Embed.addField(`**__Status de la commandes :__**`, `${command.info.status}`, true)
    }
    Embed.addField(`**__Catégories :__**`, `${command.info.category}`, true)
    .setColor(color.blue)
    .setFooter(`Syntax : <> = optionel et [] = requis.`, message.author.avatarURL())
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL({ dynamic: true })}`)
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .setTimestamp()
    if(command.info.aliases.length > 0) {
      Embed.addField(`**__Aliases :__**`, `\`${command.info.aliases.join(", ")}\``, true)
    }
    Embed.addField(`**__Cooldown :__**`, `${command.info.cooldown || require('../../settings/settings.json').defaultcooldown} seconde(s)`, true)
    if(command.info.permissions.length > 0) {
      Embed.addField(`**__Permissions :__**`, `\`${command.info.permissions.join(", ")}\``, true)
    }
    if(command.info.usage) {
      Embed.addField(`**__Utilisations :__**`, `${command.info.usage}`, true)
    }    
    message.channel.send({ content: `Une information détaillé de la commande.`, embeds: [Embed] })
  }
}

module.exports.info = {
 name: "help",
 aliases: ["help", "aide", "need-help"],
 category: "🔰 Misc",
 usage: "help <command_name>",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}