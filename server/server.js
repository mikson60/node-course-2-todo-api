require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        console.log(`Todo query with id ${id} not valid`);
        res.status(404).send();
        return;
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log(`Todo query with id ${id} not found`);
            res.status(404).send();
            return;
        }
        console.log(`Todo query with id ${id} found`);
        res.status(200).send({todo});
    }).catch((e) => {
        console.log(`Todo query with id ${id} failed`, e);
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    console.log(`Trying to remove todo with id ${id}`);

    if (!ObjectID.isValid(id)) {
        console.log(`Id ${id} is invalid`);
        res.status(404).send();
        return;
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            console.log(`Todo with id ${id} not found`);
            res.status(404).send();
            return;
        }
        console.log('Removal successful');
        res.status(200).send({todo});
    }).catch((e) => {
        console.log('Todo removal failure');
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    console.log(`Trying to update todo with id ${id}`);

    if (!ObjectID.isValid(id)) {
        console.log(`Id ${id} is invalid`);
        res.status(404).send();
        return;
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            console.log(`Todo with id ${id} not found`);
            res.status(404).send();
            return;
        }

        console.log(`Todo with id ${id} updated successfully`);
        res.send({todo});
    }).catch((e) => {
        console.log(`Todo with id ${id} update failure`);
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => { // return keeps the chain alive. Goes to catch if shit hits the fan
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(401).send(e);
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};