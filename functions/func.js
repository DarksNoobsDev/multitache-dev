const { MessageEmbed, Collection } = require('discord.js')
const mongoose = require('mongoose')
const { db, defaultSettings } = require('../settings/config.json')
const { Guild, User } = require('./models/export')
/** 
 * @INFO
 * Cooldowns
 * @author 
 * DarksNoobs
 * @param message Le message de l'évènement message
 * @param client Le client
 * @param command Définitions de la commande éxécuter 
 **/
 function onCoolDown(message, client, command) {
  if(!client.cooldowns.has(command.info.name)){
    client.cooldowns.set(command.info.name, new Collection())
  }
  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.info.name)
  const cdAmount = (command.info.cooldown || require("../settings/settings.json")) * 1000
  
  if(tStamps.has(message.author.id)) {
    const cdExpiritionTime = tStamps.get(message.author.id) + cdAmount;
   if(timeNow < cdExpiritionTime) {
      const TimeLeft = (cdExpiritionTime - timeNow) / 1000;
      const Embed = new MessageEmbed()
      .setTitle(`:x: Tu dois attendre **${TimeLeft.toFixed(2)}** seconde(s).\n\nSois **${TimeLeft * 1000}** millisecondes !`)
      .setColor(require('../settings/color.json').red)
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({ dynamic: true })}`)
      return message.channel.send({ embeds: [Embed] });
   } else {
    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount)
    }
  } else {
    tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount)
  }
 }
 function formatTime(o, useMilli = false) {
   let parts = []
   if (o.days) {
     let ret = o.days + ' Day'
     if (o.days !== 1) {
       ret += 's'
     }
     parts.push(ret)
   }
   if (o.hours) {
     let ret = o.hours + ' Hr'
     if (o.hours !== 1) {
       ret += 's'
     }
     parts.push(ret)
   }
   if (o.minutes) {
     let ret = o.minutes + ' Min'
     if (o.minutes !== 1) {
       ret += 's'
     }
     parts.push(ret)
 
   }
   if (o.seconds) {
     let ret = o.seconds + ' Sec'
     if (o.seconds !== 1) {
       ret += 's'
     }
     parts.push(ret)
   }
   if (useMilli && o.milliseconds) {
     let ret = o.milliseconds + ' ms'
     parts.push(ret)
   }
   if (parts.length === 0) {
     return 'instantly'
   } else {
     return parts
   }
 }
 function parseDuration(duration) {
   let remain = duration
   let days = Math.floor(remain / (1000 * 60 * 60 * 24))
   remain = remain % (1000 * 60 * 60 * 24)
 
   let hours = Math.floor(remain / (1000 * 60 * 60))
   remain = remain % (1000 * 60 * 60)
 
   let minutes = Math.floor(remain / (1000 * 60))
   remain = remain % (1000 * 60)
 
   let seconds = Math.floor(remain / (1000))
   remain = remain % (1000)
 
   let milliseconds = remain
 
   return {
     days,
     hours,
     minutes,
     seconds,
     milliseconds
   };
 }
 
 function duration(duration, useMilli = false) {
   let time = parseDuration(duration)
   return formatTime(time, useMilli)
 }
 
 function GetRole(message, arg){
   var errormessage = ":x: Je n'ai pas pu trouver le rôle";
   return new Promise(async (resolve, reject) => {
     var args = arg, client = message.client;
     if(!client || !message) return reject("CLIENT IS NOT DEFINED")
     if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
     let user = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
     if(!user && args[0] && args[0].length == 18) {
       user = message.guild.roles.cache.get(args[0])
       if(!user) return reject(errormessage)
       return resolve(user);
     }
     else if(!user && args[0]){
       let alluser = message.guild.roles.cache.map(role => String(role.name).toLowerCase())
       user = alluser.find(r => r.split(" ").join("").includes(args.join("").toLowerCase()))
       user = message.guild.roles.cache.find(role => String(role.name).toLowerCase() === user)
       if(!user) return reject(errormessage)
       return resolve(user);
     }
     else {
       user = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
       if(!user) return reject(errormessage)
       return resolve(user);
     }
   })
 }
 
 function load(client) {
   LoadCommand(client)
 }
 
 function initDb() {
   const options = {
     autoIndex: false, // Don't build indexes
     poolSize: 10, // Maintain up to 10 socket connections
     serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
     family: 4 // Use IPv4, skip trying IPv6
   };
   mongoose.connect(db)
   mongoose.Promise = global.Promise;
   mongoose.connection.on('connected', () => console.log("La db est connected"))
 }
 
 const CreateGuild = async NewGuild => {
 const All = Object.assign({ _id: mongoose.Types.ObjectId() }, NewGuild)
 const Cguild = await new Guild(All)
 Cguild.save();
 }

 const GetGuild = async guild => {
   const data = await Guild.findOne({ guildId: guild.id })
   if(data) return data;
   return defaultSettings
 }

 const UpdateGuild = async (guild, settings) => {
   let data = await GetGuild(guild);
   if(typeof data !== "object") data = {}
   for (const key in settings) {
    if(data[key] !== settings[key]) data[key] = settings[key];
   }
   return data.updateOne(settings)
 }
//  User
const CreateUser = async NewUser => {
  const All = Object.assign({ _id: mongoose.Types.ObjectId() }, NewUser)
  const Cguild = await new User(All)
  Cguild.save();
  }

  const GetUser = async user => {
    const data = await User.findOne({ UserId: user.id })
    if(data) return data;
    else return;
  }

  const UpdateUser = async (user, settings) => {
    let data = await GetUser(user);
    if(typeof data !== "object") data = {}
    for (const key in settings) {
     if(data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings)
  }

  const UpdateExp = async (client, member, exp) => {
    const userToDate = await GetUser(member);
    const updatedExp = userToDate.exp + exp;
    await UpdateUser(member, { exp: updatedExp });
  }
  /** Xp **/
/** Exports all **/
module.exports = {
 onCoolDown,
 duration,
 parseDuration,
 formatTime,
 GetRole,
 load,
/** Guild + db **/
 initDb,
 GetGuild,
 CreateGuild,
 UpdateGuild,
/** User */
  CreateUser,
  GetUser,
  UpdateUser,
/** Exp */
  UpdateExp
}
const { LoadCommand } = require('./commands')