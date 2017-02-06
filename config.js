var config = {};

config.database = {};
config.web = {};

config.database.host = 'localhost';
config.database.port = 27017;
config.database.db_name = 'api';

config.web.url = '/api';
config.web.port = 8000;

module.exports = config;