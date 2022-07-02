import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import { performance } from 'perf_hooks';

import { Mover, Vector2 } from './engine';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

enum Events {
    Connect = "connection",
    Disconnect = "disconnect",
    Update = "update",
    Remove = 'remove'
}

enum Rooms {
    GameUpdates = "game updates"
}


app.use('/static', express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on(Events.Connect, onConnect);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

const frameTime = 33.33; // desired ms between frames. 33.3 is 30fps, 16.6 is 60fps
setInterval(gameUpdate, frameTime);
let frameStart = 0;
let movers: Mover[] = [];

function onConnect(socket: socketio.Socket) {
    let id = Math.floor(Math.random() * 100000);
    console.log(`user ${id} connected`);
    socket.join(Rooms.GameUpdates)

    addMover(id);
    socket.on(Events.Disconnect, () => {
        console.log(`user ${id} disconnected`);
        removeMover(id);
        io.in(Rooms.GameUpdates).emit(Events.Remove, id);
    });
}

function gameUpdate() {
    let frameEnd = performance.now();
    let deltaTime = (frameEnd - frameStart) / 1000;
    frameStart = frameEnd;

    movers.forEach(z => z.Update(deltaTime));

    io.in(Rooms.GameUpdates).emit(Events.Update, movers, getMoverString(movers))
}

function addMover(id) {
    movers.push(new Mover(
        id,
        Vector2.Random(500, 50),
        Vector2.Random(150, 50)
    ));
}

function removeMover(id) {
    movers = movers.filter(z => z.Id != id);
}

function getMoverString(movers: Mover[]): string {
    return movers
        .map((x: Mover) => x.toString())
        .reduce((a: string, b: string) => a + '\n' + b, '');
}
