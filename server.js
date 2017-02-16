// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// Load config file
var config = require('./config');
// Load all routes
var routes = require('./routes');

// Connect to the database
var connectString = 'mongodb://';
if (config.database.authentication) {
    connectString += config.database.username + ':' + config.database.password + '@' + config.database.host + ':' + config.database.port + '/' + config.database.db_name;
} else {
    connectString += config.database.host + ':' + config.database.port + '/' + config.database.db_name;
}

mongoose.Promise = require('bluebird');
mongoose.connect(connectString);


// Fix for getting info via JavaScript (web front-end)
// Copied here: http://stackoverflow.com/questions/7067966/how-to-allow-cors
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


var app = express();
app.use(allowCrossDomain);

// Use the body-parser package to parse incomming json files
app.use(bodyParser.json({
    extended: true
}));

app.use(config.web.url, routes);

// Start the server
app.listen(config.web.port);
console.log('API ready! Listening on port: ' + config.web.port);
