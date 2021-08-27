const { MessageEmbed, Util } = require("discord.js")
const color = require('../../settings/color.json')
const { inspect } = require("util")
module.exports.run = async (client, message, args) => {
 try {
  if(!args.length) return message.channel.send({ content: "Veuilliez entrer du code a évalluer !" })
  //define a global variable
  let evaled;
  //if the args include the word token, return console error
  if (args.join(` `).includes(`token`))  return message.channel.send('Pas de token grabing svp ;)')
  //get the evaled content
  evaled = await eval(args.join(` `));
  //make string out of the evaluation
  let string = inspect(evaled);
  //if the token is included return error
  if (string.includes(client.token))  return message.channel.send('Pas de token grabing svp ;)')
  //define queueembed
  let evalEmbed = new MessageEmbed()
    .setTitle(`${client.user.username} | Evaluation terminé`)
    .setColor(color.green);
  //split the description
  const splitDescription = Util.splitMessage(string, {
    maxLength: 2040,
    char: `\n`,
    prepend: ``,
    append: ``
  });
  //For every description send a new embed
  splitDescription.forEach(async (m) => {
    //(over)write embed description
    evalEmbed.setDescription(`\`\`\`` + m + `\`\`\``);
    //send embed
    message.channel.send({embeds: [evalEmbed]});
  });
} catch (e) {
 const Err = new MessageEmbed()
 new MessageEmbed()
    .setColor(color.red)
    .setTitle(`:x: ERROR | UNE ERREUR S'EST PRODUIT`)
    .setDescription(`\`\`\`${e.message}\`\`\``)
  return message.channel.send({embeds: [Err]}
  );
} 
}

module.exports.info = {
 name: "detailedeval",
 aliases: ["d-eval", "d-evaluate", "d-evalcode"],
 category: "👑 Owner",
 description: "Evalue du code javascript en détaille...",
 usage: "eval [code_javascript]",
 permissions: ["ADMINISTRATOR"],
 needOwner: true,
 status: "100% 🟢"
}