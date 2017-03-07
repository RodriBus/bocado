const debug = require('debug')('bocado:help-command');
const Command = require('../command');
const Message = require('../message');


const helpCommand = new Command('help', ' [command]` shows help for a command', (modifier) => {
  const command = Command.instances[modifier];
  if (!modifier || !command) {
    debug('Modifier or command not found. Displaying all commands.');
    const commands = Object.keys(Command.instances);
    let msg = 'Available command options:\n';
    msg = commands.reduce((last, current) => `${last}• \`/bocado ${current}${Command.instances[current].description}\n`, msg);
    return new Message(msg);
  }
  debug(`Displaying help for command ${modifier}`);
  const msg = `Help for ${modifier}\n${command.help}`;
  return new Message(msg);
});

helpCommand.help = `Usage:
\`/bocado help [option]\` shows help for an option.`;

module.exports = helpCommand;
