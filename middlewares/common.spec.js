/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const app = require('../bin/www');
const chai = require('chai');
const spies = require('chai-spies');

const request = require('supertest');

const middlewares = require('./common');

const expect = chai.expect;

const token = '0';
const command = 'bocata';
const user_id = '0';

chai.use(spies);

process.env.DEBUG = 'bocado:*';
process.env.NODE_ENV = 'test';
process.env.BOCADO_TOKEN = token;
process.env.BOCADO_COMMAND = command;

describe('validatePayload middleware', () => {
  const { validatePayload } = middlewares;
  it('should return a function()', () => {
    expect(validatePayload).to.be.a.Function;
  });
  it('should accept three arguments', () => {
    expect(validatePayload.length).to.equal(3);
  });
  it('should validate token is sent', () => {
    const req = { body: { command, user_id } };
    const spy = chai.spy();
    validatePayload(req, {}, spy);
    expect(spy).to.have.been.called.once();
  });
  it('should validate command is sent', () => {
    const req = { body: { token, user_id } };
    const spy = chai.spy();
    validatePayload(req, {}, spy);
    expect(spy).to.have.been.called.once();
  });
  it('should validate user_id is sent', () => {
    const req = { body: { token, command } };
    const spy = chai.spy();
    validatePayload(req, {}, spy);
    expect(spy).to.have.been.called.once();
  });
});

