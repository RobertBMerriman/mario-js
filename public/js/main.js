import Camera from './Camera.js';
import Timer from './Timer.js';
import Entity from './Entity.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// Ep 7: 25:00

const camera = new Camera();

Promise.all([
  createMario(),
  loadLevel('1-1', camera),
])
.then(([
  mario,
  level,
]) => {
  mario.pos.set(64, -180);

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const deltaTime = 1/60;
  const timer = new Timer(deltaTime);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }

    level.compositor.draw(context, camera);
  }

  timer.start();
});
