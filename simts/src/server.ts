import * as express from 'express';
import * as http from 'http';
import {performance} from 'perf_hooks';
import {Server, Socket} from 'socket.io';

import {events, rooms} from './enums';
import {mover} from './mover';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;


app.use('/lib', express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});
app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/client/index.js');
});

io.on(events.connect, onConnect);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const frameTime = 33.33; // desired ms between frames. 33.3 is 30fps, 16.6 is 60fps
setInterval(gameUpdate, frameTime);
let frameStart = 0;
let movers: mover[] = [];

function onConnect(socket: Socket) {
  const newMover = mover.fromRandom();
  const id = newMover.id;
  console.log(`user ${id} connected`);
  socket.join(rooms.gameUpdates);

  addMover(newMover);
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

function addMover(mover: mover) {
  movers.push(mover);
}

function removeMover(id: number) {
  movers = movers.filter(z => z.id !== id);
}

function getMoverString(movers: mover[]): string {
  return movers
    .map((x: mover) => x.toString())
    .reduce((a: string, b: string) => a + '\n' + b, '');
}
