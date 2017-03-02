/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Command = require('./command');
const chai = require('chai');
const spies = require('chai-spies');

const expect = chai.expect;
chai.use(spies);

describe('command class', () => {
  beforeEach(() => {
    Command.clearInstances();
  });

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
  let instance;

  beforeEach(() => {
    Command.clearInstances();
    spy.reset();
    instance = new Command(id, description, spy);
  });

  it('should accept up to 3 parameters', () => {
    expect(instance).to.be.ok;
  });
  it('should have help property', () => {
    expect(instance.help).to.be.a.defined;
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
  describe('second parameter', () => {
    it('should be the description', () => {
      expect(instance.description).to.be.equal(description);
    });
    it('should be optional', () => {
      const dontThrow = () => new Command('NO TRHOW');
      expect(dontThrow).to.not.throw;
    });
  });
  describe('third parameter', () => {
    it('should be the exec function', () => {
      expect(instance.execFn).to.be.equal(spy);
    });
    it('should be optional', () => {
      const dontThrow = () => new Command('NO TRHOW', description);
      expect(dontThrow).to.not.throw;
    });
    it('should be a function', () => {
      const hasToThrow = () => new Command('TRHOW', description, 'I\'m not a function');
      expect(hasToThrow).to.throw(Error);
    });
    it('should be a function that recieves parameters', () => {});
  });
  describe('exec function', () => {
    it('should execute execFn', () => {
      instance.exec();
      expect(spy).to.have.been.called.once;
    });
    it('should execute execFn with exec parameters', () => {
      const params = ['a', 0, () => {}];
      instance.exec(...params);
      expect(spy).to.have.been.called.with(...params);
    });
    it('should return execFn result', () => {
      expect(instance.exec()).to.be.equal(execFnResult);
    });
    it('should throw error when execFn is not a function', () => {
      const hasToThrow = new Command('TRHOW', '', () => {});
      hasToThrow.execFn = 'I\'m not a function';
      expect(hasToThrow.exec).to.throw(Error);
    });
  });
});




