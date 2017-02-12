var config = {};

config.database = {};
config.web = {};

config.database.host = 'localhost';
config.database.port = 27017;
config.database.db_name = 'api';
config.database.authentication = false;
config.database.username = '';
config.database.password = '';


config.web.url = '/api';
config.web.port = 8000;

module.exports = config;