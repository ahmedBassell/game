'use strict';

// Constants
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const PORT = config.get('ports.port');
const DB_PORT = config.get('ports.db');

// DB setup
mongoose.connect('mongodb://mongo:' + DB_PORT);

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

app.get('/', (req, res) => {
    console.log('hello again');
    res.send('hello\nYEEEEY! ^_^');
})

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
