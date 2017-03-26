require('dotenv-safe').load();
const mongoose = require('mongoose');
const debug = require('debug')('bocado:db');
const { Bocata } = require('./models');

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



function getAllBocatas() {
  return new Promise((resolve, reject) => {
    Bocata.find({}).sort('id').then(resolve).catch(reject);
  });
}

function findBocataById(id) {
  return new Promise((resolve, reject) => {
    Bocata.find({ id }).then(resolve).catch(reject);
  });
}

module.exports = {
  getAllBocatas,
  findBocataById,
};
