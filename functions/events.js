const fs = require('fs')
const AsciiTable = require('ascii-table')
const table = new AsciiTable("Events")
.setHeading('Events', 'Status')

const loadEvents = (client, dir = "./events") => {
fs.readdirSync(dir).forEach(dirs => {
     const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
     
     for (const event of events) {
         const evt = require(`../${dir}/${dirs}/${event}`);
         const evtName = event.split('.')[0];
         client.on(evtName, evt.bind(null, client))
         table.addRow(evtName, "Prêt")
    }
 })
 console.log(table.toString());
};

module.exports = {
 loadEvents
}