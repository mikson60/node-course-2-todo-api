const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    /*
    db.collection('Todos').deleteMany({text: 'Check out Gamedev Days event'}).then((result) => {
        console.log(result);
    });
    */
    // deleteOne
    /*
    db.collection('Todos').deleteOne({text: 'Check out Gamedev Days event'}).then((result) => {
        console.log(result);
    });
    */
    // findOneAndDelete
    /*
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    }); */

    db.collection('Users').deleteMany({name: 'Jens'}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log("error: " + err);
    });
    //db.collection('Users').findOneAndDelete({_id: new ObjectID('5ab2e04a18db3641909b7576')})
    //.then((result) => {
    //    console.log(JSON.stringify(result, undefined, 2));
    //});

    // db.close();
});