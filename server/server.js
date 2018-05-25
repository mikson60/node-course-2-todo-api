var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
        res.status(200).send(todo);
    }).catch((e) => {
        console.log('Todo removal failure');
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};