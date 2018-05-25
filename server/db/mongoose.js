var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(`CONNECTING TO DB AT ${process.env.MONGODB_URI}`);
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };