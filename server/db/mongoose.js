var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds235180.mlab.com:35180/todo-app-db');

module.exports = { mongoose };