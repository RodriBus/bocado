require('dotenv-safe').load();
const mongoose = require('mongoose');
const debug = require('debug')('bocado:db');
const { Bocata, Order, OrderList } = require('./models');

const {
  DBUSER,
  DBPASSWORD,
  DBHOST,
  DBCOLLECTION,
} = process.env;

// set mongo promise type to es6 promise
mongoose.Promise = global.Promise;

debug('Connecting to mongo db...');
mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBCOLLECTION}`).then(() => {
  debug('Mongo db connected!');
}).catch((err) => {
  debug('Mongo db connection failed!', err);
});



function getAllBocatas() {
  return new Promise((resolve, reject) => {
    Bocata.find({}).sort('id').then(resolve).catch(reject);
  });
}

function findBocataById(id) {
  return new Promise((resolve, reject) => {
    Bocata.find({ id }).then(resolve).catch(reject);
  });
}

let orderList;
function startOrderList() {
  return new Promise((resolve, reject) => {
    if (orderList) {
      return reject('There is another list active right now!');
    }
    orderList = OrderList();
    debug(`Starting order list id ${orderList._id}`);
    orderList.save().then(resolve).catch(reject);
  });
}

function endOrderList() {
  return new Promise((resolve, reject) => {
    if (!orderList) {
      return reject('There is no order list available jet!');
    }
    debug(`Ending order list id ${orderList._id}`);
    resolve(orderList);
    orderList = null;
  });
}

function addBocataToOrderList(id, user, modifiers) {
  return new Promise((resolve, reject) => {
    debug(`Looking for bocata id ${id}`);
    Bocata.findOne({ id }).then((doc) => {
      debug(`Found bocata with id ${id}. Creating order...`);
      const order = Order({
        bocata: doc._id,
        modifiers,
        user,
      });
      order.save().then(() => {
        debug('Order saved');
        orderList.orders.push(order);
        orderList.save().then(resolve).catch(reject);
      });
    }).catch(reject);
  });
}

function getCurrentOrderList() {
  return new Promise((resolve, reject) => {
    let findParams = {};
    if (orderList) {
      findParams = { _id: orderList._id };
    }
    debug('Looking for last order list');
    OrderList.findOne(findParams, {}, { sort: { date: -1 } }).populate('orders').then((doc) => {
      debug(`Found order list id ${doc._id}`);
      resolve(doc);
    }).catch(reject);
  });
}

module.exports = {
  getAllBocatas,
  findBocataById,
  startOrderList,
  endOrderList,
  addBocataToOrderList,
  getCurrentOrderList,
};
