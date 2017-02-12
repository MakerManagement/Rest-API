// Load required packages
var Tag = require('../models/tag');

exports.postTags = function(req, res) {
  // Create a new instance of the Tag model
  var tag = new Tag();

  // Set the tag properties that came from the POST data
  tag.tag = req.body.tag;

  // Save the tag and check for errors
  tag.save(function(err) {
    if (err) {
      if(err.code == 11000) {
        res.json({ message: 'Tag already exists!!', data: err });
		return;
	  }
      res.send(err);
	}
	

    res.json({ message: 'Tag added!', data: tag });
  });
};

exports.getTags = function(req, res) {
  // Use the Tag model to find all tags
  Tag.find(function(err, tags) {
    if (err)
      res.send(err);

    res.json(tags);
  });
};

exports.getTag = function(req, res) {
  // Use the Tag model to find a specific tag
  Tag.findById(req.params.tag_id, function(err, tag) {
    if (err)
      res.send(err);

    res.json(tag);
  });
};

exports.putTag = function(req, res) {
  // Use the Tag model to find a specific tag
  Tag.findById(req.params.tag_id, function(err, tag) {
    if (err)
      res.send(err);

    // Update the existing tag language values
    tag.tag = req.body.tag;

    // Save the tag and check for errors
    tag.save(function(err) {
      if (err)
        res.send(err);

      res.json(tag);
    });
  });
};

exports.deleteTag = function(req, res) {
  // Use the Tag model to find a specific tag and remove it
  Tag.findByIdAndRemove(req.params.tag_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Tag removed!' });
  });
};