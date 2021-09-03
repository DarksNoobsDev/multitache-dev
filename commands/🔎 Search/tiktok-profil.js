const { MessageEmbed } = require("discord.js")
const TikTokScraper = require('tiktok-scraper')
const { formatNumber } = require('easy-number-formatter')
module.exports.run = async (client, message, args) => {
	message.channel.sendTyping()	
 const user = await TikTokScraper.getUserProfileInfo(`${args[0] || "tiktok"}`).catch(message.channel.send(`Je n'arrive pas a trouver la personnes sur tiktok !`))
	const Embed = new MessageEmbed()
	if(user.user.verified) {
	Embed.setTitle(`__Profil de :__ ${user.user.nickname}`)	
	} else {
		Embed.setTitle(`__Profil de :__ ${user.user.nickname}`)
	}
 Embed.addField(`**__Id unique :__**`, `${user.user.uniqueId}`, true)
 Embed.addField(`**__Nom d'utilisateur :__**`, `${user.user.nickname}`, true)
	.setURL(`https://www.tiktok.com/@${user.user.uniqueId}`)
 .addField(`**__❱ Followers :__**`, `${formatNumber(user.stats.followerCount)}`, false)
 .addField(`**__❱ Followings :__**`, `${formatNumber(user.stats.followingCount)}`, true)
 .setThumbnail(user.user.avatarThumb)
	.addField(`**__❱ Likes :__**`, `${formatNumber(user.stats.heartCount)}`, true)
	.setColor(require('../../settings/color.json').purple)
	.addField(`**__❱ Vidéos :__**`, `${formatNumber(user.stats.videoCount)}`, true)
 message.channel.send({ embeds:[Embed] })
}

module.exports.info = {
 name: "tiktok-profil",
 aliases: ["search-tiktok", "tiktok-profilinfo", "t-profil-info"],
 category: "🔎 Search",
 description: "Affiche l'informations d'un comptes tiktok.",
 usage: "tiktok-profil <user-id>",
 permissions: ["SEND_MESSAGES"],
 status: "100% 🟢"
}