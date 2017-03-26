/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Message = require('../message');
const Command = require('../command');
const startCommand = require('./start');
const chai = require('chai');

const expect = chai.expect;

describe('start', () => {
  it('should export a command instance', () => {
    expect(startCommand).to.be.an.instanceof(Command);
  });
  describe('exec', () => {
    it('should return a promise instance', () => {
      expect(startCommand.exec()).to.be.an.instanceof(Promise);
    });
    it('should pass a message instance to the promise', () => {
      startCommand.exec().then((msg) => {
        expect(msg).to.be.an.instanceof(Message);
      });
    });
  });
});
