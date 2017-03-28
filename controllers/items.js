// Load required packages
var Item = require('../models/item');

exports.postItems = function (req, res) {
    // Create a new instance of the Item model
    var item = new Item();

    // Set the item properties that came from the POST data
    item.item_name = req.body.item_name;
    item.description = req.body.description;
    item.categories = req.body.categories;
    item.tags = req.body.tags;
    item.locale = req.body.locale;
    item.image_url = req.body.image_url;
    item.amount = req.body.amount;

    // Save the item and check for errors
    item.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                res.json({message: 'Item already exists!!', data: err});
                return;
            }
            res.send(err);
            return;
        }
        res.status(201).json({message: 'item added!', data: item});
    });
};

exports.getItems = function (req, res) {
    // Use the Item model to find all items
    Item.find().populate('tags').populate('locale').populate('categories').exec(function (err, items) {
        if (err) {
            res.send(err);
        } else {
            res.json(items);
        }
    });
};

exports.getItem = function (req, res) {
    // Use the Item model to find a specific item
    Item.findById(req.params.item_id).populate('tags').populate('locale').populate('categories').exec(function (err, item) {
        if (err) {
            res.send(err)
			return;
        }
        if (item == null) {
            res.status(404).send({error: 'Did not find any item with id: ' + req.params.item_id});
        } else {
            res.json(item);
        }
    });
};

exports.putItem = function (req, res) {
    // Use the Item model to find a specific item
    Item.findById(req.params.item_id, function (err, item) {
        if (err)
            res.send(err);
			return;
        if (item == null) {
            res.status(404).send({error: 'Did not find any item with id: ' + req.params.item_id});
            return;
        }

        // Update the existing item quantity
        item.item_name = req.body.item_name;
        item.description = req.body.description;
        item.categories = req.body.categories;
        item.tags = req.body.tags;
        item.locale = req.body.locale;
        item.image_url = req.body.image_url;
        item.amount = req.body.amount;

        // Save the item and check for errors
        item.save(function (err) {
            if (err) {
                res.send(err);
				return;
            } else {
                res.json(item);
            }
        });
    });
};

exports.deleteItem = function (req, res) {
    // Use the Item model to find a specific item and remove it
    Item.findByIdAndRemove(req.params.item_id, function (err, item) {
        if (err)
            res.send(err);
			return;
        if (item == null) {
            res.status(404).send({error: 'Did not find any item with id: ' + req.params.item_id});
        } else {
            res.json({message: 'Item removed!'});
        }
    });
};