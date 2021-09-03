const { Collection, MessageEmbed } = require('discord.js');
const { ownerIds } = require('../../settings/info.json')
const config = require('../../settings/embed')
const color = require('../../settings/color.json')
const { GetGuild, GetUser, CreateUser, UpdateExp } = require('../../functions/func')
module.exports = async (client, message) => {
  if(message.author.bot) return;
  const settings = await GetGuild(message.guild)
  const UserInDb = await GetUser(message.member)
  if(!UserInDb) await CreateUser({
    guildId: message.member.guild.id,
    guildName: message.member.guild.name,
    userId: message.member.id,
    username: message.member.user.tag
  });

   const expCd = Math.floor(Math.random() * 19) + 1;
  const expToAdd = Math.floor(Math.random() * 25) + 10;

  if(expCd >= 8 && expCd <= 11) await UpdateExp(client, message.member, expToAdd);
  if(!message.content.startsWith(settings.prefix)) return;
   const args = message.content.slice(settings.prefix.length).split(/ +/);
   const commandName = args.shift().toLowerCase()

   // Vérification de la commandes avec aliases
   const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(commandName))
   if(!command) return;
     
   
      /**  Cooldowns **/
      const { onCoolDown, ToPermissions } = require('../../functions/func')
      
      if (command.info.permissions && command.info.permissions.length > 0 && !message.member.permissions.has(command.info.permissions)) {
        const Embed = new MessageEmbed()
        .setTitle(`:x: Tu a besoin de ces permissions pour pouvoir éxécuter la commandes ! `)
        .setColor(require('../../settings/color.json').red)
        .setDescription(`\`\`\`${command.info.permissions.join(", ")}\`\`\``)
        .setURL("https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS") 
        return message.channel.send({ embeds: [Embed] });
      }
      if(command.info.needOwner && message.author.id !== ownerIds) {
        const Embed = new MessageEmbed()
        .setTitle(`Tu n'a pas la permissions d'utilisé cette commandes. Il faut être le owner du bot`)
        .setColor(color.purple)
        return message.channel.send({ embeds: [Embed] });
      }
      if(onCoolDown(message, client, command)) {
        return;
      }
      command.run(client, message, args, settings, UserInDb)
}