const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderListSchema = new Schema({
  id: Number,
  active: Boolean,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

orderListSchema.pre('save', function(next) {
  console.log(this.updated_at, Date.now());
  this.updated_at = Date.now();
  next();
});

let OrderList;
if (mongoose.models.OrderList) {
  OrderList = mongoose.model('OrderList');
} else {
  OrderList = mongoose.model('OrderList', orderListSchema);
}

module.exports = OrderList;
