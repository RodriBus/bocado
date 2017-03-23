const mongoose = require('mongoose');
const debug = require('debug')('bocado:db');

const {
  DBUSER,
  DBPASSWORD,
  DBHOST,
  DBCOLLECTION,
} = process.env;

let isConnected = false;

function connect() {
  if (isConnected) {
    return new Promise((resolve) => { resolve(mongoose); });
  }
  const p = new Promise((resolve, reject) => {
    debug('Connecting to mongo db');
    mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBCOLLECTION}`).then((...args) => {
      debug('Mongo db connected');
      resolve(mongoose, ...args);
    }).catch((...args) => {
      debug('Mongo db connection failed');
      reject(...args);
    });
  });
  return p;
}

function getClient() {
  return mongoose;
}


module.exports = {
  connect,
  getClient,
};

