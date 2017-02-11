// Load required packages
var mongoose = require('mongoose');

// Define our item schema
var ItemSchema   = new mongoose.Schema({
  item_name: { type: String, unique: true, required: true },
  description: {
    eng: String,
    nor: String
  },
  amount: Number,
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  tags:  [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  location: {type: Schema.Types.ObjectId, ref: 'Location'},
  image_url: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Item', ItemSchema);