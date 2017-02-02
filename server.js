// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Load models
var Item = require('./models/item');

// Connect to the api MongoDB
mongoose.connect('mongodb://localhost:27017/api');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 1337
var port = process.env.PORT || 8081;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:1337/api
router.get('/', function(req, res) {
  res.json({ message: 'Hello World!!' });
});

// Create a new route with the prefix /items
var itemRoute = router.route('/items');

// Create endpoint /api/items for POSTS
itemRoute.post(function(req, res) {
  // Create a new instance of the Item model
  var item = new Item();

  // Set the item properties that came from the POST data
  item.item_name = req.body.item_name;
  item.description = req.body.description;
  item.image_url = req.body.image_url;
  item.box_id = req.body.box_id;
  item.quantity = req.body.quantity;

  // Save the item and check for errors
  item.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'item added to the locker!', data: item });
  });
});

// Create endpoint /api/items for GET
itemRoute.get(function(req, res) {
  // Use the Item model to find all items
  Item.find(function(err, items) {
    if (err)
      res.send(err);

    res.json(items);
  });
});

var itemRoute = router.route('/items/:item_id');

// Create endpoint /api/items/:item_id for GET
itemRoute.get(function(req, res) {
  // Use the Item model to find a specific item
  Item.findById(req.params.item_id, function(err, item) {
    if (err)
      res.send(err);

    res.json(item);
  });
});

itemRoute.put(function(req, res) {
  // Use the Item model to find a specific item
  Item.findById(req.params.item_id, function(err, item) {
    if (err)
      res.send(err);

    // Update the existing item quantity
    item.quantity = req.body.quantity;

    // Save the item and check for errors
    item.save(function(err) {
      if (err)
        res.send(err);

      res.json(item);
    });
  });
});

itemRoute.delete(function(req, res) {
  // Use the Item model to find a specific item and remove it
  Item.findByIdAndRemove(req.params.item_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item removed from the locker!' });
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('API ready! Listening on port: ' + port);
