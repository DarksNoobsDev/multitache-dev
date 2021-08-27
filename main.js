const { Client, Collection } = require('discord.js')
const { token } = require('./settings/config.json')

const client = new Client({
 partials: ['CHANNEL','GUILD_MEMBER','MESSAGE','REACTION','USER'],
 intents: 32767,
 presence: { status: "dnd", activities: [{
  name: "avec vous tous!",
  url: "https://www.twitch.tv/NASA",
  type: "STREAMING"
 }]},
 allowedMentions: {
  parse: ['everyone','roles','users'],
  repliedUser: false,
}
})
client.commands = new Collection()
client.cooldowns = new Collection()
client.cooldowns = new Collection()
const { load } = require('./functions/loadAll')
load(client)

client.login(token)