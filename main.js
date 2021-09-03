const { Client, Collection } = require('discord.js')
const { token } = require('./settings/config.json')

const client = new Client({
 partials: ['CHANNEL','GUILD_MEMBER','MESSAGE','REACTION','USER'],
 intents: 32767,
 presence: { status: "dnd", activities: [{
  name: "Defaults prefix --> m!",
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
client.color = require('./settings/color.json')

const { load, initDb } = require('./functions/func')
require('./functions/events').loadEvents(client)


load(client);
initDb();
client.login(token);