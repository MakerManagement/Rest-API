// Load required packages
var mongoose = require('mongoose');

// Define our location schema
var LocationSchema   = new mongoose.Schema({
  locale: String
});

// Export the Mongoose model
module.exports = mongoose.model('Location', LocationSchema);