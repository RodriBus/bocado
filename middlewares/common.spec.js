/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const app = require('../bin/www');
const chai = require('chai');
const spies = require('chai-spies');

const middlewares = require('./common');

const expect = chai.expect;
const assert = chai.assert;

const token = '0';
const command = 'bocata';
const user_id = '0';

chai.use(spies);

process.env.DEBUG = 'bocado:*';
process.env.NODE_ENV = 'test';
process.env.BOCADO_TOKEN = token;
process.env.BOCADO_COMMAND = command;

describe('common middlewares', () => {
  const simpleSpy = chai.spy();
  const errorOkSpy = chai.spy((err) => {
    if (err instanceof Error) {
      assert.isOk('everything', 'everything is ok');
    } else {
      assert.fail(err, undefined, 'No error was passed to middleware');
    }
  });
  const errorFailSpy = chai.spy((err) => {
    if (err instanceof Error) {
      assert.fail(err, undefined, 'Error was passed to middleware');
    } else {
      assert.isOk('everything', 'everything is ok');
    }
  });

  beforeEach(() => {
    simpleSpy.reset();
    errorOkSpy.reset();
    errorFailSpy.reset();
  });

  describe('apply middlewares', () => {
    const { apply } = middlewares;
    const middlewaresLength = Object.keys(middlewares).length - 1;
    it('should apply all middlewares', () => {
      expect(apply).to.be.a.Function;
      apply({ use: simpleSpy });
      expect(simpleSpy).to.have.been.called.exactly(middlewaresLength);
    });
  });

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
      validatePayload(req, {}, errorOkSpy);
      expect(errorOkSpy).to.have.been.called.once();
    });
    it('should validate command is sent', () => {
      const req = { body: { token, user_id } };
      validatePayload(req, {}, errorOkSpy);
      expect(errorOkSpy).to.have.been.called.once();
    });
    it('should validate user_id is sent', () => {
      const req = { body: { token, command } };
      validatePayload(req, {}, errorOkSpy);
      expect(errorOkSpy).to.have.been.called.once();
    });
  });

  describe('validateToken middleware', () => {
    const { validateToken } = middlewares;
    it('should return a function()', () => {
      expect(validateToken).to.be.a.Function;
    });
    it('should accept three arguments', () => {
      expect(validateToken.length).to.equal(3);
    });
    it('should validate token sent equals to configured one', () => {
      const req = { body: { token } };
      validateToken(req, {}, errorFailSpy);
      expect(errorFailSpy).to.have.been.called.once();
    });
    it('should fail if token is not sent', () => {
      const req = { body: {} };
      validateToken(req, {}, errorOkSpy);
      expect(errorOkSpy).to.have.been.called.once();
    });
  });

  describe('validateCommand middleware', () => {
    const { validateCommand } = middlewares;
    it('should return a function()', () => {
      expect(validateCommand).to.be.a.Function;
    });
    it('should accept three arguments', () => {
      expect(validateCommand.length).to.equal(3);
    });
    it('should validate token sent equals to configured one', () => {
      const req = { body: { command: `/${command}` } };
      validateCommand(req, {}, errorFailSpy);
      expect(errorFailSpy).to.have.been.called.once();
    });
    it('should fail if token is not sent', () => {
      const req = { body: {} };
      validateCommand(req, {}, errorOkSpy);
      expect(errorOkSpy).to.have.been.called.once();
    });
  });
});



