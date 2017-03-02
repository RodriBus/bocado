/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const processor = require('./command-processor');
const chai = require('chai');
const spies = require('chai-spies');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/start');

chai.use(spies);

const expect = chai.expect;

describe('command processor', () => {
  const execSpy = chai.spy(startCommand.exec);
  const argument = '';
  const modifier = '';
  const properties = '';
  beforeEach(() => {
    execSpy.reset();
  });

  it('should export a function()', () => {
    expect(processor).to.be.a.function;
  });
  it('should execute a command passed as first parameter\'s argument property', () => {
    processor({ argument });
    expect(execSpy).to.be.called.once;
  });
  it('should execute a command with first parameter\'s modifier and extra properties', () => {
    processor({ argument, modifier, properties });
    expect(execSpy).to.be.called.with(argument, modifier, properties);
  });
  it('should return command\'s exec result', () => {
    expect(processor({ argument })).to.be.ok;
  });
  it('should execute help command if command not found', () => {
    expect(processor()).to.be.equal(helpCommand.exec());
  });
});
