// Load required packages
var mongoose = require('mongoose');

// Define our item schema
var ItemSchema   = new mongoose.Schema({
  item_name: { type: String, unique: true, required: true },
  description: {
    en: String,
    no: String
  },
  short_description: {
    en: String,
    no: String
  },
  categories: [{type: mongoose.Schema.ObjectId, ref: 'Category'}],
  tags:  [{type: mongoose.Schema.ObjectId, ref: 'Tag'}],
  locale: {type: mongoose.Schema.ObjectId, ref: 'Location'},
  image_url: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Item', ItemSchema);