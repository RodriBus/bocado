/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Message = require('../message');
const Command = require('../command');
const startCommand = require('./start');
const chai = require('chai');

const expect = chai.expect;

describe('utils', () => {
  it('should export a command instance', () => {
    expect(startCommand).to.be.an.instanceof(Command);
  });
  describe('exec', () => {
    it('should return a message instance', () => {
      expect(startCommand.exec()).to.be.an.instanceof(Message);
    });
  });
});
