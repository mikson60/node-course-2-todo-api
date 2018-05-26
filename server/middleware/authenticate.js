var {User} = require('./../models/user');

var authenticate = (req, res, next) => { // route is not going to run until next is called inside the middleware
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(); // This moves to the .catch() part.
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};