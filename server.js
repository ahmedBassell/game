// Constants

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 3000;
const DB_PORT = 27017;

// DB setup
mongoose.connect('mongodb://mongo:' + DB_PORT, function(err) {
    if (err)
        console.log(err);
    }
);

const Player = mongoose.model('Player', {
    name: String,
    score: Number
});

// Use express static middleware to serve static files
app.use(express.static('public'));
// app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/add', (req, res) => {

    const player = new Player({name: req.param('name'), score: req.param('score')});

    player.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(player);
        }
    });
    res.send({status: 'OK'});
});

app.get('/players', (req, res) => {
    Player.find({}, (err, players) => {
        if (err)
            return console.error(err);
        console.log(players);
        res.send(players);
    });
});

app.get('/clear', (req, res) => {
    mongoose.connection.db.dropDatabase();
    res.send({status: 'OK'});
});

app.get('/', (req, res) => {
    res.render('index');
});

// const server = app.listen(PORT);
server.listen(PORT);

console.log('Running on http://localhost:' + PORT);

io.on('connection', function(socket) {
    socket.on('movement', function(data) {
        console.log(data);
        socket.emit('movement', data);
    });
});
