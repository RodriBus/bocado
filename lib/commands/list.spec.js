/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Message = require('../message');
const Command = require('../command');
const mongoose = require('mongoose');
const listCommand = require('./list');
const chai = require('chai');

const expect = chai.expect;

afterEach((done) => {
  mongoose.connection.close();
  return done();
});

describe('list', () => {
  it('should export a command instance', () => {
    expect(listCommand).to.be.an.instanceof(Command);
  });
  describe('exec', () => {
    it('should return a promise instance', () => {
      expect(listCommand.exec()).to.be.an.instanceof(Promise);
    });
    it('should pass a message instance to the promise', () => {
      listCommand.exec().then((msg) => {
        expect(msg).to.be.an.instanceof(Message);
      });
    });
  });
});
