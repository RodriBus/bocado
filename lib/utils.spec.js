/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const utils = require('./utils');
const chai = require('chai');

const expect = chai.expect;

describe('utils', () => {
  it('should export', () => {
    expect(utils).to.be.an.object;
  });
  describe('isFunction', () => {
    const { isFunction } = utils;
    it('should export isFunction as a function', () => {
      expect(isFunction).to.be.a.isFunction;
    });
    it('should validate parameter is a function', () => {
      const fnOk = () => {};
      expect(isFunction(fnOk)).to.be.true;
      expect(isFunction()).to.be.false;
      expect(isFunction(1)).to.be.false;
      expect(isFunction('')).to.be.false;
      expect(isFunction({})).to.be.false;
      expect(isFunction('not fn')).to.be.false;
      expect(isFunction(null)).to.be.false;
      expect(isFunction(undefined)).to.be.false;
      expect(isFunction(true)).to.be.false;
      expect(isFunction(false)).to.be.false;
      expect(isFunction(Symbol('some symbol'))).to.be.false;
    });
  });
});




