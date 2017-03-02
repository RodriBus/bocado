const debug = require('debug')('bocatero:commands');
const Command = require('../command');
const path = require('path');

const normalizedPath = path.join(__dirname, 'commandFiles');

require('fs').readdirSync(normalizedPath).forEach((file) => {
  const comm = require(`./commandFiles/${file}`);
  debug(`Command "${comm.id}" loaded`);
});

module.exports = Command.instances;
