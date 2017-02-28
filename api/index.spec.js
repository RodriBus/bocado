/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const app = require('../bin/www');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const token = '0';
const command = 'bocata';
const user_id = '0';

process.env.DEBUG = 'bocado:*';
process.env.NODE_ENV = 'test';
process.env.BOCADO_TOKEN = token;
process.env.BOCADO_COMMAND = command;

describe('API Tests', () => {
  it('should return version number', (done) => {
    const postData = {
      token,
      command: `/${command}`,
      user_id,
    };

    request(app)
      .get('/')
      .send(postData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.version).to.be.ok;
        done();
      });
  });
});
