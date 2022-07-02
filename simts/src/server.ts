import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import {performance} from 'perf_hooks';

import {float2} from './float2';
import {mover} from './engine';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 3000;

enum events {
  connect = 'connection',
  disconnect = 'disconnect',
  update = 'update',
  remove = 'remove'
}

enum rooms {
  gameUpdates = 'game updates'
}


app.use('/static', express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on(events.connect, onConnect);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const frameTime = 33.33; // desired ms between frames. 33.3 is 30fps, 16.6 is 60fps
setInterval(gameUpdate, frameTime);
let frameStart = 0;
let movers: mover[] = [];

function onConnect(socket: socketio.Socket) {
  const id = Math.floor(Math.random() * 100000);
  console.log(`user ${id} connected`);
  socket.join(rooms.gameUpdates);

  addMover(id);
  socket.on(events.disconnect, () => {
    console.log(`user ${id} disconnected`);
    removeMover(id);
    io.in(rooms.gameUpdates).emit(events.remove, id);
  });
}

function gameUpdate() {
  const frameEnd = performance.now();
  const deltaTime = (frameEnd - frameStart) / 1000;
  frameStart = frameEnd;

  movers.forEach(z => z.update(deltaTime));

  io.in(rooms.gameUpdates).emit(events.update, movers, getMoverString(movers));
}

function addMover(id: number) {
  movers.push(new mover(
    id,
    float2.fromRandom(500, 50),
    float2.fromRandom(150, 50)
  ));
}

function removeMover(id: number) {
  movers = movers.filter(z => z.id !== id);
}

function getMoverString(movers: mover[]): string {
  return movers
    .map((x: mover) => x.toString())
    .reduce((a: string, b: string) => a + '\n' + b, '');
}
