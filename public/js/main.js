import {setupMouseControl} from './debug/debug.js';
import Camera from './Camera.js';
import Timer from './Timer.js';
import Entity from './Entity.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

// Ep 6! 13:20 Just made scrolling possible with the mouse.

Promise.all([
  createMario(),
  loadLevel('1-1'),
])
.then(([
  mario,
  level,
]) => {
  const camera = new Camera();
  window.camera = camera;

  mario.pos.set(64, 180);
  mario.vel.set(50, 0);

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  setupMouseControl(canvas, mario, camera);

  const deltaTime = 1/60;
  const timer = new Timer(deltaTime);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.compositor.draw(context, camera);
  }

  timer.start();
});
