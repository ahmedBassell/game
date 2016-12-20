'use strict';

const express = require('express');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://mongo:27017');

// Constants
const PORT = 3000;

const Player = mongoose.model('Player', {
    name: String,
    score: Number
});

// App
const app = express();
app.get('/add', (req, res) => {

    var player = new Player({
        name: req.param('name'),
        score: req.param('score')
    });

    player.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(player);
        }
    });
    res.send({
        status: 'OK'
    })
});

app.get('/players', (req, res) => {
    Player.find({}, (err, players) => {
        if (err) return console.error(err);
        console.log(players);
        res.send(players);
    })
})

app.get('/clear', (req, res) => {
    mongoose.connection.db.dropDatabase()
    res.send({
        status: 'OK'
    })
})

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
