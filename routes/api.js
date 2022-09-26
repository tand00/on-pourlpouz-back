var express = require('express');
var router = express.Router();

import { Room } from '../models/rooms'; 

var rooms = {};

router.post('/create-room', function(req, res) {
    if(!("name" in  req.body)) return res.json({result: false});
    let roomName = req.body.name;
    if(roomName in rooms) return res.json({result: false});
    rooms[roomName] = new Room();
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
    let player = req.body.player;
    let room = rooms[roomName];
    room.registerAnswer(player, answer);
    res.json({result: true});
});

router.post('/next-state', function(req, res) {
    let roomName = req.body.name;
    let room = rooms[roomName];
    room.nextState();
    res.json({result: true});
});

router.post('/pass', function(req, res) {
    let roomName = req.body.name;
    let room = rooms[roomName];
    room.pass();
});

module.exports = router;
