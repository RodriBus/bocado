const Command = require('../command');
const Message = require('../message');

// TODO: evaluate to switch from instance to static class inheriting command
const startCommand = new Command('start', 'opens a new order request', () => new Message('Start command!'));

startCommand.help = '';

module.exports = startCommand;
