// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./routes');

// Connect to the database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.db_name);

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json({
  extended: true
}));

app.use(config.web.url, routes);

// Start the server
app.listen(config.web.port);
console.log('API ready! Listening on port: ' + config.web.port);
