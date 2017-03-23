require('dotenv-safe').load();
const mongoose = require('mongoose');
const debug = require('debug')('bocado:db');
require('./models');

const {
  DBUSER,
  DBPASSWORD,
  DBHOST,
  DBCOLLECTION,
} = process.env;

// set mongo promise type to es6 promise
mongoose.Promise = global.Promise;

debug('Connecting to mongo db...');
mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBCOLLECTION}`).then(() => {
  debug('Mongo db connected!');
}).catch((err) => {
  debug('Mongo db connection failed!', err);
});

