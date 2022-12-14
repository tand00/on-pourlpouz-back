var express = require('express');
var router = express.Router();

var Room = require('../models/rooms');

var rooms = {};

router.get('/', function(req,res) {
    res.send("Hello !");
});

router.post('/create-room', function(req, res) {
    if(!("name" in  req.body)) return res.json({result: false});
    let roomName = req.body.name;
    if(roomName in rooms) return res.json({result: false});
    rooms[roomName] = new Room(roomName);
    res.json({ result: true });
});

router.get('/room-status/:roomName', function(req, res) {
    let roomName = req.params.roomName;
    if(!(roomName in rooms)) return res.json({result: false});
    let room = rooms[roomName];
    return res.json(room.getStatus());
});

router.post('/send-answer', function(req, res) {
    let roomName = req.body.name;
    let answer = req.body.answer;
    let room = rooms[roomName];
    room.registerAnswer(answer);
    res.json({result: true});
});

router.post('/next-state', async function(req, res) {
    let roomName = req.body.name;
    let room = rooms[roomName];
    await room.nextState();
    res.json({result: true});
});

router.post('/pass', async function(req, res) {
    let roomName = req.body.name;
    let room = rooms[roomName];
    await room.pass();
    res.json({result: true});
});

module.exports = router;
