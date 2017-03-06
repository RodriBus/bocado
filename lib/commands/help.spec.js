/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Message = require('../message');
const Command = require('../command');
const helpCommand = require('./help');
const chai = require('chai');

const expect = chai.expect;

describe('help', () => {
  it('should export a command instance', () => {
    expect(helpCommand).to.be.an.instanceof(Command);
  });
  describe('exec', () => {
    it('should return a message instance', () => {
      expect(helpCommand.exec()).to.be.an.instanceof(Message);
    });
  });
});
