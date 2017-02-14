var config = {};

config.database = {};
config.web = {};

config.database.host = 'localhost';
config.database.port = 27017;
config.database.db_name = 'api';
config.database.authentication = false;
config.database.username = 'nodeAPI';
config.database.password = '56Es*jJ4t!T-tM8K';


config.web.url = '/api';
config.web.port = 8000;

module.exports = config;