// Module requis
const AsciiTable = require('ascii-table')
const table = new AsciiTable('Commandes')
.setHeading('Commandes', 'Etat', 'Catégories')
const fs = require('fs')

const LoadCommand = (client, dir = "./commands") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        for (let file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.info.name, getFileName);
            table.addRow(getFileName.info.name, 'Prêt', getFileName.info.category)
        }
    })
    console.log(table.toString());
};

module.exports = {
    LoadCommand
}