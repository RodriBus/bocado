const commands = require('./commands');

function commandProcessor(options) {
  return new Promise((resolve, reject) => {
    const command = commands[options.argument];
    if (command) {
      command.exec(options.modifier, options.properties).then(resolve).catch(reject);
    }
    commands.help.exec(options.modifier, options.properties).then(resolve).catch(reject);
  });
}

module.exports = commandProcessor;
