var env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

var config = require('./config.json');

if (env === 'development' || env === 'test') {
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
} else if (env === 'production') {
    // var envConfig = config[env];

    // Object.keys(envConfig).forEach((key) => {
    //     process.env[key] = envConfig[key];
    // });
    process.env.MONGODB_URI = 'mongodb://admin:admin@ds235180.mlab.com:35180/todo-app-db';
}


// if (env === 'production') {
//     process.env.MONGODB_URI = 'mongodb://admin:admin@ds235180.mlab.com:35180/todo-app-db';
// } else if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }