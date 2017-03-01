/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const Message = require('./message');
const chai = require('chai');

const expect = chai.expect;

describe('message class', () => {
  it('should be a function()', () => {
    expect(Message).to.be.a.Function;
  });
  it('should be a constructor', () => {
    const instance = new Message('');
    expect(instance).to.be.an.instanceof(Message);
  });
});

describe('message instance', () => {
  const text = 'some text';
  const instance = new Message(text);
  it('should have mrkdwn property as true', () => {
    expect(instance.mrkdwn).to.be.true;
  });
  describe('text parameter', () => {
    it('should be mandatory', () => {
      expect(() => new Message()).to.throw(Error);
    });
    it('should apply over text property', () => {
      expect(instance.text).to.be.equal(text);
    });
  });
  describe('toString function', () => {
    it('should return a string', () => {
      expect(instance.toString()).to.be.string;
    });
    it('should return a json string', () => {
      expect(instance.toString()).to.be.equal('{"mrkdwn":true,"text":"some text"}');
    });
  });
});


