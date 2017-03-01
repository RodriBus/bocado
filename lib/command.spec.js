/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Command = require('./command');
const Message = require('./message');
const chai = require('chai');
const spies = require('chai-spies');

const expect = chai.expect;
chai.use(spies);

describe('command class', () => {
  it('should be a function()', () => {
    expect(Command).to.be.a.Function;
  });
  it('should be a constructor', () => {
    const instance = new Command('ABC');
    expect(instance).to.be.an.instanceof(Command);
  });
  it('should expose instances property', () => {
    expect(Command).to.have.property('instances');
  });
});

describe('command instance', () => {
  const id = 'TEST';
  const description = 'TEST DESCRIPTION';
  const execFnResult = 'RESULT';
  const spy = chai.spy(() => execFnResult);
  const instance = new Command(id, description, spy);
  it('should accept up to 3 parameters', () => {
    const unused = new Command('3Comm', 'some param', () => {});
  });
  it('should have exec function', () => {
    expect(instance.exec).to.be.a.Function;
  });
  it('sould register himself as command', () => {
    expect(Command.instances[id]).to.be.ok;
    expect(Command.instances[id]).to.deep.equal(instance);
  });
  describe('first parameter', () => {
    it('should be the id', () => {
      expect(instance.id).to.be.equal(id);
    });
    it('should be mandatory', () => {
      const hasToThrow = () => new Command();
      expect(hasToThrow).to.throw(Error);
    });
    it('should be unique among instances', () => {
      const hasToThrow = () => new Command(id, description, spy);
      expect(hasToThrow).to.throw(Error);
    });
  });
  describe('exec function', () => {
    it('should return execFn result', () => {
      expect(instance.exec()).to.be.equal(execFnResult);
    });
    it('should throw error when execFn is not a function', () => {
      const hasToThrow = new Command('TRHOW', '', 'I\'m not a function');
      expect(hasToThrow.exec).to.throw(Error);
    });
  });
});




