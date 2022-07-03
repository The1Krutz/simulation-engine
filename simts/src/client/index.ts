import {io} from 'socket.io-client';
import * as Two from 'twojs-ts';

import {mover} from '../mover';


console.log('index.js part four');
// drawing stuff
const elem = document.getElementById('draw-shapes');
const params = {width: 500, height: 500};
const two = new Two(params).appendTo(elem);

const border = two.makeRectangle(250, 250, 500, 500);
border.stroke = 'black';
border.linewidth = 3;

const circles: {[id: number]: Two.Circle} = {};

// socket stuff
const socket = io();
socket.on('update', (movers: mover[], moverstring: string) => {
  // console.log(moverstring)
  movers.forEach(mover => {
    if (circles[mover.id]) {
      // console.log('moving existing circle', mover.id)
      circles[mover.id].translation.set(mover.position.x, mover.position.y);
    } else {
      // console.log('creating new circle', mover.id)
      circles[mover.id] = two.makeCircle(mover.position.x, mover.position.y, 5);
      circles[mover.id].fill = mover.color;
    }
  });

  two.update();
});

socket.on('remove', id => {
  // console.log('explicitly removing', id)
  circles[id].remove();
  circles[id] = undefined;
});