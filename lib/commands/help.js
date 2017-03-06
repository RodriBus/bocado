const Command = require('../command');
const Message = require('../message');

const helpCommand = new Command('help', 'shows help message', () => new Message('Help command!'));

helpCommand.help = '';

module.exports = helpCommand;
