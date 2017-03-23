const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bocataSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  ingredients: String,
  available: Boolean,
});

const Bocata = mongoose.model('Bocata', bocataSchema);

module.exports = Bocata;
