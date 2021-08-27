const { MessageEmbed, Collection } = require('discord.js')

module.exports = {
 onCoolDown,
 duration,
 parseDuration,
 formatTime,
 GetRole
}






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