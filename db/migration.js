require('dotenv-safe').load();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  Bocata,
} = require('./models');

const {
  DBUSER,
  DBPASSWORD,
  DBHOST,
  DBCOLLECTION,
} = process.env;

let ids = 0;

mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBCOLLECTION}`);

function onError(err) {
  console.error('Migration failed!', err);
}

function onFinalInsert(documents) {
  console.info(`Migration finished! Inserted ${documents.length} documents.`);
}

function insertRecords() {
  const bocatas = [
    Bocata({
      id: ids += 1,
      name: 'Jamón serrano con tomate',
      price: 2.5,
      igredients: '',
      available: true,
    }),
    Bocata({
      id: ids += 1,
      name: 'Vegetal',
      price: 2.5,
      ingredients: 'Huevo, lechuga, tomate, espárragos blancos y mahonesa',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Atún, lechuga y Salsa César',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Queso de cabra con tomate y aceite',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Tropical',
      price: 2.5,
      ingredients: 'Ensalada de cangrejo y piña',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Mediterráneo',
      price: 2.5,
      ingredients: 'Atún, anchoas, mahonesa y tomate',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Salmón con salsa de yogurt',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Anchoas con queso Philadelphia',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Pepito de ternera',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Lacón con queso',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Chorizo frito',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Chistorra y pimientos',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Pollo a la plancha con mahonesa',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Bacon con queso',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Tortilla Española',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Lomo a la plancha con tomate',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Sándwich mixto',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Hamburguesa clásica',
      price: 2.5,
      ingredients: '',
      available: true,
    }),

    Bocata({
      id: ids += 1,
      name: 'Croissant de jamón y queso',
      price: 2.5,
      ingredients: '',
      available: true,
    }),
  ];

  Bocata.insertMany(bocatas).then(onFinalInsert).catch(onError);
}

Bocata.remove({}).then(insertRecords).catch(onError);
