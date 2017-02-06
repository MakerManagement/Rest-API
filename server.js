// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');

// Load controllers
var itemController = require('./controllers/items')

// Connect to the database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.db_name);

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = config.web.port;
var router = express.Router();

// Initial dummy route for testing
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

app.use(config.web.url, router);

// Start the server
app.listen(port);
console.log('API ready! Listening on port: ' + port);
