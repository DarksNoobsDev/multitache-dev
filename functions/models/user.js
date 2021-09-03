const mongoose = require('mongoose')

const UserSchemas = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 guildId: String,
 guildName: String,
 userId: String,
 username: String,
 exp: {
  "type": Number,
  "default": 0
 },
 level: {
  "type": Number,
  "default": 0
 }
})

module.exports = mongoose.model("Users", UserSchemas);