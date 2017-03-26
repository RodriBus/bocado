/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const processor = require('./command-processor');
const chai = require('chai');
const spies = require('chai-spies');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');

chai.use(spies);

const expect = chai.expect;

describe('command processor', () => {
  startCommand.exec = chai.spy(startCommand.exec);
  helpCommand.exec = chai.spy(helpCommand.exec);
  const argument = 'start';
  const modifier = 'modifier';
  const properties = 'properties';
  beforeEach(() => {
    helpCommand.exec.reset();
    startCommand.exec.reset();
  });

  it('should export a function()', () => {
    expect(processor).to.be.a.function;
  });
  it('should return a promise instance', () => {
    expect(processor({ argument, modifier, properties })).to.be.an.instanceof(Promise);
  });
  it('should execute a command passed as first parameter\'s argument property', () => {
    processor({ argument });
    expect(startCommand.exec).to.be.called.once;
  });
  it('should execute a command with first parameter\'s modifier and extra properties', () => {
    processor({ argument, modifier, properties });
    expect(startCommand.exec).to.be.called.with(modifier, properties);
  });
  it('should return command\'s exec result', () => {
    expect(processor({ argument })).to.be.ok;
  });
  it('should execute help command if command not found', () => {
    processor({ argument: 'I don\'t exists' });
    expect(helpCommand.exec).to.be.called.once;
  });
});
