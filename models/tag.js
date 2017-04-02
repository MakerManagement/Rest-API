// Load required packages
var mongoose = require('mongoose');

// Define our tag schema
var TagSchema = new mongoose.Schema({
    tag: {
        en: {type: String, required: true},
        no: String
    }
});


// Export the Mongoose model
module.exports = mongoose.model('Tag', TagSchema);