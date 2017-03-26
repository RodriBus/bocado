const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bocataSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  ingredients: String,
  available: Boolean,
});

let Bocata;
if (mongoose.models.Bocata) {
  Bocata = mongoose.model('Bocata');
} else {
  Bocata = mongoose.model('Bocata', bocataSchema);
}

module.exports = Bocata;
