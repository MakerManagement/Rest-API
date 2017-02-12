// Load required packages
var mongoose = require('mongoose');

// Define our tag schema
var TagSchema   = new mongoose.Schema({
  tag_id: mongoose.Schema.ObjectId,
  tag: {
    eng: String,
    nor: String
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Tag', TagSchema);