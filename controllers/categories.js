// Load required packages
var Category = require('../models/category');

exports.postCategories = function (req, res) {
    // Create a new instance of the Category model
    var category = new Category();

    // Set the category properties that came from the POST data
    category.category = req.body.category;

    // Save the category and check for errors
    category.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                res.json({message: 'Category already exists!!', data: err});
                return;
            }
            res.send(err);
            return;
        }
        res.status(201).json({message: 'Category added!', data: category});
    });
};

exports.getCategories = function (req, res) {
    // Use the Category model to find all categories
    Category.find(function (err, categories) {
        if (err) {
            res.send(err);
			return;
        } else {
            res.json(categories);
        }
    });
};

exports.getCategory = function (req, res) {
    // Use the Category model to find a specific category
    Category.findById(req.params.category_id, function (err, category) {
        if (err)
            res.send(err);
			return;
        if (category == null) {
            res.status(404).send({error: 'Did not find any category with id: ' + req.params.category_id});
        } else {
            res.json(category);
        }
    });
};

exports.putCategory = function (req, res) {
    // Use the Category model to find a specific category
    Category.findById(req.params.category_id, function (err, category) {
        if (err)
            res.send(err);
			return;
        if (category == null) {
            res.status(404).send({error: 'Did not find any category with id: ' + req.params.category_id});
            return;
        }

        // Update the existing category language values
        category.category = req.body.category;

        // Save the category and check for errors
        category.save(function (err) {
            if (err) {
                res.send(err);
				return;
            } else {
                res.json(category);
            }
        });
    });
};

exports.deleteCategory = function (req, res) {
    // Use the Category model to find a specific category and remove it
    Category.findByIdAndRemove(req.params.category_id, function (err, category) {
        if (err)
            res.send(err);
			return;
        if (category == null) {
            res.status(404).send({error: 'Did not find any category with id: ' + req.params.category_id});
        } else {
            res.json({message: 'Category removed!', data: category});
        }
    });
};