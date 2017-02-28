const debug = require('debug')('bocado:server');

/*
token=gIkuvaNzQIHg97ATvDxqgjtO
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
user_id=U2147483697
user_name=Steve
command=/weather
text=94070
response_url=https://hooks.slack.com/commands/1234/5678
*/
function validate(body) {
  const requiredProps = [
    'token',
    'user_id',
    'command',
  ];
  return requiredProps.filter(prop => prop in body).length === requiredProps.length;
}

function validatePayload(req, res, next) {
  if (!validate(req.body)) {
    debug('Required parameters missing!');
    const err = new Error('Required parameters missing!');
    err.status = 500;
    next(err);
  } else {
    next();
  }
}

function validateToken(req, res, next) {
  const { token } = req.body;
  if (process.env.BOCADO_TOKEN !== token) {
    debug('Token missing');
    const err = new Error('Token missing!');
    err.status = 500;
    next(err);
  } else {
    next();
  }
}

function validateCommand(req, res, next) {
  const { command } = req.body;
  if (`/${process.env.BOCADO_COMMAND}` !== command) {
    debug('Token missing');
    const err = new Error('Command missing!');
    err.status = 500;
    next(err);
  } else {
    next();
  }
}

function apply(app) {
  app.use(validatePayload);
  app.use(validateToken);
  app.use(validateCommand);
}

module.exports = {
  apply,
  validatePayload,
  validateToken,
  validateCommand,
};
