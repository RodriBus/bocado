const debug = require('debug')('bocatero:command');

const instances = {};

class Command {
  static get instances() {
    return instances;
  }

  constructor(id, description, execFn) {
    if (!id) {
      throw new Error('Command has not ID defined');
    }
    this.id = id;
    this.description = description;
    this.execFn = execFn;
    this.help = null;
  }

  exec() {
    if (this.execFn && typeof this.execFn === 'function') {
      debug(`executing command ${this.id}`);
      return this.execFn();
    }
    throw new Error(`Command ${this.id}(${this.name}) doesn't have execute function defined`);
  }

  static register(command) {
    instances[command.id] = command;
  }
}

module.exports = Command;
