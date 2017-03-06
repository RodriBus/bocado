const commands = require('./commands');

function commandProcessor(options) {
  const command = commands[options.argument];
  if (command) {
    return command.exec(options.modifier, options.properties);
  }
  return commands.help.exec(options.modifier, options.properties);
}

module.exports = commandProcessor;
