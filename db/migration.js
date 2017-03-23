require('dotenv-safe').load();
const mongoose = require('mongoose');
const Bocata = require('../models/bocata');

const {
  DBUSER,
  DBPASSWORD,
  DBHOST,
  DBCOLLECTION,
} = process.env;

mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBCOLLECTION}`);

function onError(err) {
  console.error('Migration failed', err);
}

function onFinalInsert(documents) {
  console.info(`Migration finished! Inserted ${documents.length} documents.`);

  // Bocata.find({id: 1}).then(console.log);
  // Bocata.findOneAndUpdate({id:1}, {id:3}).then(console.log)
}

function insertRecords() {
  const tortilla = Bocata({
    id: 1,
    name: 'Tortilla',
    ingredients: 'Huevos y patatas',
    available: true,
  });

  const chorizo = Bocata({
    id: 2,
    name: 'Chorizo',
    ingredients: 'Chorizo con pan',
    available: true,
  });

  Bocata.insertMany([tortilla, chorizo]).then(onFinalInsert).catch(onError);
}

Bocata.remove({}).then(insertRecords).catch(onError);
