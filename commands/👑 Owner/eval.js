const { MessageEmbed, Util } = require("discord.js")
const color = require('../../settings/color.json')
const { inspect } = require("util")
module.exports.run = async (client, message, args) => {
  try {
    if(!args.length) return message.channel.send({ content: "Veuilliez entrer du code a évalluer !" })
    let evaled;
    if (args.join(` `).includes(`token`)) return message.channel.send('Pas de token grabing svp ;)');
    evaled = await eval(args.join(` `));
    let string = inspect(evaled);
    if (string.includes('token')) return message.channel.send('Pas de token grabing svp ;)');
    
    let evalEmbed = new MessageEmbed()
      .setTitle(`${client.user.username} | Evalution terminé`)
      .setColor(color.purple);
    //Split le msg
    const splitDescription = Util.splitMessage(string, {
      maxLength: 2040,
      char: `\n`,
      prepend: ``,
      append: ``
    });
    // Le code en question est renvvoyé
    evalEmbed.setDescription(`\`\`\`` + splitDescription[0] + `\`\`\``);
    //send embed
    message.channel.send({embeds: [evalEmbed]});
  } catch (e) {
   const Err = new MessageEmbed()
   .setColor(color.red)
   .setTitle(`:x: ERREUR | UNE ERREUR S'EST PRODUIT`)
   .setDescription(`\`\`\`${e.message}\`\`\``)
    return message.channel.send({ embeds: [Err] });
  }
  
}

module.exports.info = {
 name: "eval",
 aliases: ["eval", "evaluate", "eval-code"],
 category: "👑 Owner",
 description: "Evalue du code javascript en détaille...",
 usage: "eval [code_javascript]",
 permissions: ["ADMINISTRATOR"],
 needOwner: true,
 status: "100% 🟢"
}