const debug = require('debug')('bocatero:command');
const utils = require('./utils');

let instances = {};

class Command {
  static get instances() {
    return instances;
  }

  static clearInstances() {
    instances = {};
  }

  constructor(id, description = null, execFn = () => {}) {
    if (typeof id === 'undefined') {
      throw new Error('Command has not ID defined');
    }
    if (instances[id]) {
      throw new Error('ID has to be unique among commands');
    }
    if (!utils.isFunction(execFn)) {
      throw new Error('execFn has to be a function');
    }
    this.id = id;
    this.description = description;
    this.execFn = execFn;
    this.help = null;
    instances[id] = this;
  }

  exec(...args) {
    if (utils.isFunction(this.execFn)) {
      debug(`executing command ${this.id}`);
      return this.execFn(...args);
    }
    throw new Error(`Command ${this.id}(${this.name}) doesn't have execute function defined`);
  }

  static register(command) {
    instances[command.id] = command;
  }
}

module.exports = Command;
