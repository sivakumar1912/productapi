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
    orderinfo: { type: Array },
    orderstatus: { type: String },
    orderdate: { type:String }
  },
  {
    collection: 'order'
  }
);

module.exports = mongoose.model('Order', Order);

