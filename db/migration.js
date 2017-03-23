require('dotenv-safe').load();
const mongoose = require('mongoose');
const { Bocata } = require('./models');

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
  const tortilla = Bocata({
    id: ids += 1,
    name: 'Tortilla',
    ingredients: 'Huevos y patatas',
    available: true,
  });

  const chorizo = Bocata({
    id: ids += 1,
    name: 'Chorizo',
    ingredients: 'Chorizo con pan',
    available: true,
  });

  Bocata.insertMany([tortilla, chorizo]).then(onFinalInsert).catch(onError);
}

Bocata.remove({}).then(insertRecords).catch(onError);


/*
1 -  Jamón serrano con tomate
----------------
Precio 2.5 €

2 -  Vegetal
----------------
huevo, lechuga, tomate, espárragos blancos y mahonesa.
Precio 2.5 €

3 -  Atún, lechuga y Salsa César
----------------
Precio 2.5 €

4 -  Queso de cabra con tomate y aceite
----------------
Precio 2.5 €

5 -  Tropical
----------------
ensalada de cangrejo y piña
Precio 2.5 €

6 -  Mediterráneo
----------------
atún, anchoas, mahonesa y tomate
Precio 2.5 €

7 -  Salmón con salsa de yogurt
----------------
Precio 2.5 €

8 -  Anchoas con queso Philadelphia
----------------
Precio 2.5 €

9 -  Pepito de ternera
----------------
Precio 2.5 €

10 -  Lacón con queso
----------------
Precio 2.5 €

11 -  Chorizo frito
----------------
Precio 2.5 €

12 -  Chistorra y pimientos
----------------
Precio 2.5 €

13 -  Pollo a la plancha con mahonesa
----------------
Precio 2.5 €

14 -  Bacon con queso
----------------
Precio 2.5 €

15 -  Tortilla Española
----------------
Precio 2.5 €

16 -  Lomo a la plancha con tomate
----------------
Precio 2.5 €

17 -  Sándwich mixto
----------------
Precio 2.5 €

18 -  Hamburguesa clásica
----------------
Precio 2.5 €

19 -  Croissant de jamón y queso
----------------
Precio 2.5 €
*/
