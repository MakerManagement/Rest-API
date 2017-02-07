// Load required packages
var mongoose = require('mongoose');

// Define our item schema
var ItemSchema   = new mongoose.Schema({
  item_name: { type: String, unique: true, required: true },
  description: String,
  image_url: String,
  box_id: Number,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Item', ItemSchema);