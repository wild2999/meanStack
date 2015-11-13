var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('catalog', ['catalog']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/catalog', function (req, res) {
   console.log('I receiver a GET request');

    db.catalog.find(function (err, docs) {
        if (!docs.length) {
            console.log('Database empty')
        } else {
            console.log(docs);
        }
        res.json(docs);
    });
});

app.post('/catalog', function(req, res) {
   console.log(req.body);
    db.catalog.insert(req.body, function(err, doc) {
        res.json(doc);
    });

    //db.dropDatabase();
});

app.delete('/catalog/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.catalog.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    })
});

app.get('/catalog/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.catalog.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/catalog/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    console.log(mongojs.ObjectId(id));
    db.catalog.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc) {
            res.json(doc);
        }
    )
});

app.listen(3000);
console.log('Server running on port 3000');