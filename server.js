// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// Load config file
var config = require('./config');
// Load all routes
var routes = require('./routes');

// Connect to the database
mongoose.Promise = require('bluebird');
if(config.database.authentication) {
  mongoose.connect('mongodb://' + config.database.username + ':' + config.database.password + '@' + config.database.host + ':' + config.database.port + '/' + config.database.db_name);
} else {
  mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.db_name);
}

var app = express();

// Use the body-parser package to parse incomming json files
app.use(bodyParser.json({
  extended: true
}));

app.use(config.web.url, routes);

// Start the server
app.listen(config.web.port);
console.log('API ready! Listening on port: ' + config.web.port);
