"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var perf_hooks_1 = require("perf_hooks");
var engine_1 = require("./src/engine");
var app = express();
var server = http.createServer(app);
var io = socketio(server);
var port = 3000;
var Events;
(function (Events) {
    Events["Connect"] = "connection";
    Events["Disconnect"] = "disconnect";
    Events["Update"] = "update";
    Events["Remove"] = "remove";
})(Events || (Events = {}));
var Rooms;
(function (Rooms) {
    Rooms["GameUpdates"] = "game updates";
})(Rooms || (Rooms = {}));
app.use('/static', express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on(Events.Connect, onConnect);
server.listen(port, function () {
    console.log("listening on *:".concat(port));
});
var frameTime = 33.33; // desired ms between frames. 33.3 is 30fps, 16.6 is 60fps
setInterval(gameUpdate, frameTime);
var frameStart = 0;
var movers = [];
function onConnect(socket) {
    var id = Math.floor(Math.random() * 100000);
    console.log("user ".concat(id, " connected"));
    socket.join(Rooms.GameUpdates);
    addMover(id);
    socket.on(Events.Disconnect, function () {
        console.log("user ".concat(id, " disconnected"));
        removeMover(id);
        io.in(Rooms.GameUpdates).emit(Events.Remove, id);
    });
}
function gameUpdate() {
    var frameEnd = perf_hooks_1.performance.now();
    var deltaTime = (frameEnd - frameStart) / 1000;
    frameStart = frameEnd;
    movers.forEach(function (z) { return z.Update(deltaTime); });
    io.in(Rooms.GameUpdates).emit(Events.Update, movers, getMoverString(movers));
}
function addMover(id) {
    movers.push(new engine_1.Mover(id, engine_1.Vector2.Random(500, 50), engine_1.Vector2.Random(150, 50)));
}
function removeMover(id) {
    movers = movers.filter(function (z) { return z.Id != id; });
}
function getMoverString(movers) {
    return movers
        .map(function (x) { return x.toString(); })
        .reduce(function (a, b) { return a + '\n' + b; }, '');
}
