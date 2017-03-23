const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// create a schema
const bocataSchema = new Schema({
  id: Number,
  name: String,
  ingredients: String,
  available: Boolean,
});

const Bocata = mongoose.model('Bocata', bocataSchema);

Bocata.find({}).then((a,b) => {
  console.log(a, b)
})

setTimeout(function() {
mongoose.connect(`mongodb://test:test@ds157829.mlab.com:57829/rb_test`, {}, (a,b,c) => {console.log(a,b,c)})
  
}, 2000);
