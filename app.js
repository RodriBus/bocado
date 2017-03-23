const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/db');

const applyMiddlewares = require('./middlewares/common').apply;
const api = require('./api/index');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

applyMiddlewares(app);
app.get('/', (req, res, next) => {
  res.json({
    version: '0.0.0',
  });
});
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
