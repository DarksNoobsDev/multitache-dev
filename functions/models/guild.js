const mongoose = require('mongoose')
const { defaultSettings, defaultPrefix } = require('../../settings/config.json')

const guildSchema = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 guildId: String,
 guildName: String,
 IsPremium: {
  "type": Boolean,
  "default": false
 },
 prefix: {
  "type": String,
  "default": defaultPrefix
 },
 logChannel: {
  "type": String,
  "default": defaultSettings['log-channel']
 }
})

module.exports = mongoose.model("Guild", guildSchema);