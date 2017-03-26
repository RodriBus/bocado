const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: Number,
  bocata: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  modifiers: String,
  user: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


orderSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

let Order;
if (mongoose.models.Order) {
  Order = mongoose.model('Order');
} else {
  Order = mongoose.model('Order', orderSchema);
}

module.exports = Order;
