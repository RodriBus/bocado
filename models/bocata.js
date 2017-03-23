// grab the things we need
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const bocataSchema = new Schema({
  id: Number,
  name: String,
  ingredients: String,
  available: Boolean,
});


// let ids = 0;


// function preSave(next) {
//   console.log('PRE',this);
//   // get the current date
//   var currentDate = new Date();
  
//   // change the updated_at field to current date
//   this.updated_at = currentDate;

//   // if created_at doesn't exist, add to that field
//   if (!this.created_at)
//     this.created_at = currentDate;
//   console.log('POST',this);

//   next();
// }

//bocataSchema.pre('save', preSave);

// the schema is useless so far
// we need to create a model using it
const Bocata = mongoose.model('Bocata', bocataSchema);

// make this available to our users in our Node applications
module.exports = Bocata;
