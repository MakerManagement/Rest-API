var express = require('express');

// Load controllers
var itemController = require('./controllers/items');
var tagController = require('./controllers/tags');
var locationController = require('./controllers/locations');
var categoryController = require('./controllers/categories');
var userController = require('./controllers/users');
var authController = require('./controllers/auth');

var router = express.Router();

// Initial dummy route for testing
router.get('/', function (req, res) {
    res.json({message: 'Hello World!!'});
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

// Create endpoint prefix /tags
router.route('/tags')
    .post(tagController.postTags)
    .get(tagController.getTags);

// Create endpoint prefix /tags/:tag_id
router.route('/tags/:tag_id')
    .get(tagController.getTag)
    .put(tagController.putTag)
    .delete(tagController.deleteTag);

// Create endpoint prefix /locations
router.route('/locations')
    .post(locationController.postLocations)
    .get(locationController.getLocations);

// Create endpoint prefix /locations/:location_id
router.route('/locations/:location_id')
    .get(locationController.getLocation)
    .put(locationController.putLocation)
    .delete(locationController.deleteLocation);

// Create endpoint prefix /categories
router.route('/categories')
    .post(categoryController.postCategories)
    .get(categoryController.getCategories);

// Create endpoint prefix /categories/:category_id
router.route('/categories/:category_id')
    .get(categoryController.getCategory)
    .put(categoryController.putCategory)
    .delete(categoryController.deleteCategory);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

module.exports = router;