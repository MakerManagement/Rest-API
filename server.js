// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Load controllers
var itemController = require('./controllers/items')

// Connect to the api MongoDB
mongoose.connect('mongodb://localhost:27017/api');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 8000
var port = process.env.PORT || 8000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:1337/api
router.get('/', function(req, res) {
  res.json({ message: 'Hello World!!' });
});

// Create endpoint prefix /items
router.route('/items')
  .post(itemController.postItems)
  .get(itemController.getItems);

// Create endpoint prefix /items/:item_id
router.route('/items/:item_id')
  .get(itemController.getItem)
  .put(itemController.putItem)
  .delete(itemController.deleteItem);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('API ready! Listening on port: ' + port);
