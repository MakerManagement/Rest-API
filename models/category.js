// Load required packages
var mongoose = require('mongoose');

// Define our category schema
var CategorySchema = new mongoose.Schema({
    category: {
        en: {type: String, required: true},
        no: String
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Category', CategorySchema);