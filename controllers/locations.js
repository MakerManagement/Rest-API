// Load required packages
var Location = require('../models/location');

exports.postLocations = function (req, res) {
    // Create a new instance of the Location model
    var location = new Location();

    // Set the location properties that came from the POST data
    location.locale = req.body.locale;

    // Save the location and check for errors
    location.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                res.json({message: 'Location already exists!!', data: err});
                return;
            }
            res.send(err);
            return;
        }
        res.status(201).json({message: 'Location added!', data: location});
    });
};

exports.getLocations = function (req, res) {
    // Use the Location model to find all locations
    Location.find(function (err, locations) {
        if (err) {
            res.send(err);
			return;
        } else {
            res.json(locations);
        }
    });
};

exports.getLocation = function (req, res) {
    // Use the Location model to find a specific location
    Location.findById(req.params.location_id, function (err, location) {
        if (err)
            res.send(err);
			return;
        if (location == null) {
            res.status(404).send({error: 'Did not find any location with id: ' + req.params.location_id});
        } else {
            res.json(location);
        }
    });
};

exports.putLocation = function (req, res) {
    // Use the Location model to find a specific location
    Location.findById(req.params.location_id, function (err, location) {
        if (err)
            res.send(err);
			return;
        if (location == null) {
            res.status(404).send({error: 'Did not find any location with id: ' + req.params.location_id});
            return;
        }

        // Update the existing location language values
        location.locale = req.body.locale;

        // Save the location and check for errors
        location.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json(location);
            }
        });
    });
};

exports.deleteLocation = function (req, res) {
    // Use the Location model to find a specific location and remove it
    Location.findByIdAndRemove(req.params.location_id, function (err, location) {
        if (err)
            res.send(err);
			return;
        if (location == null)
            res.status(404).send({error: 'Did not find any location with id: ' + req.params.location_id});

        res.json({message: 'Location removed!'});
    });
};