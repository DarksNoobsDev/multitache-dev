const { LoadCommand } = require('./commands')
const { loadEvents } = require('./events')

function load(client) {
  LoadCommand(client)
  loadEvents(client)
}

module.exports = {
 load
}