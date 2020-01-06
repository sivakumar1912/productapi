// db schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// declaring collection schema property and names

let Order = new Schema(
  {
    // schema property: values
    username: { type: String },
    address: { type: String },
    mobile: { type: Number },
    orderinfo: { type: String },
    orderstatus: { type: String },
    orderdate: { type:Date }
  },
  {
    collection: 'order'
  }
);

module.exports = mongoose.model('Order', Order);

