const Command = require('../command');
const Message = require('../message');

const startCommand = new Command('start', 'opens a new order request', () => new Message('Start command!'));

startCommand.help = '';

module.exports = startCommand;
