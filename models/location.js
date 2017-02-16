// Load required packages
var mongoose = require('mongoose');

// Define our location schema
var LocationSchema = new mongoose.Schema({
    locale: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Location', LocationSchema);