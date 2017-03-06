const debug = require('debug')('bocado:commands');
const Command = require('./command');
const path = require('path');

const normalizedPath = path.join(__dirname, 'commands');

require('fs').readdirSync(normalizedPath).forEach((file) => {
  const comm = require(`./commands/${file}`);
  debug(`Command "${comm.id}" loaded`);
});

module.exports = Command.instances;
