// Load required packages
var Category = require('../models/category');

exports.postCategories = function(req, res) {
  // Create a new instance of the Category model
  var category = new Category();

  // Set the category properties that came from the POST data
  category.category = req.body.category;

  // Save the category and check for errors
  category.save(function(err) {
    if (err) {
      if(err.code == 11000) {
        res.json({ message: 'Category already exists!!', data: err });
		return;
	  }
      res.send(err);
	}
	

    res.json({ message: 'Category added!', data: category });
  });
};

exports.getCategories = function(req, res) {
  // Use the Category model to find all categories
  Category.find(function(err, categories) {
    if (err)
      res.send(err);

    res.json(categories);
  });
};

exports.getCategory = function(req, res) {
  // Use the Category model to find a specific category
  Category.findById(req.params.location_id, function(err, category) {
    if (err)
      res.send(err);

    res.json(category);
  });
};

exports.putCategory = function(req, res) {
  // Use the Category model to find a specific category
  Category.findById(req.params.location_id, function(err, category) {
    if (err)
      res.send(err);
	console.log(req.body);
    // Update the existing category language values
    category.category = req.body.category;

    // Save the category and check for errors
    category.save(function(err) {
      if (err)
        res.send(err);

      res.json(category);
    });
  });
};

exports.deleteCategory = function(req, res) {
  // Use the Category model to find a specific category and remove it
  Category.findByIdAndRemove(req.params.location_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Category removed!' });
  });
};