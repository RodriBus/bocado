/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Message = require('../message');
const commands = require('../commands');
const Command = require('../command');
const helpCommand = require('./help');
const chai = require('chai');

const expect = chai.expect;

describe('help', () => {
  it('should export a command instance', () => {
    expect(helpCommand).to.be.an.instanceof(Command);
  });
  describe('exec', () => {
    it('should return a promise instance', () => {
      expect(helpCommand.exec('help')).to.be.an.instanceof(Promise);
    });
    it('should pass a message instance to the promise', () => {
      helpCommand.exec('help').then((msg) => {
        expect(msg).to.be.an.instanceof(Message);
      });
    });
  });
});
