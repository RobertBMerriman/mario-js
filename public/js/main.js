import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';
import {setupKeyboard} from './input.js';
import { loadEntites } from './entities.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// Ep 11 MUDDAFUKAS

const camera = new Camera();

Promise.all([
  loadEntites(),
  loadLevel('1-1', camera),
])
.then(([
  entityFactories,
  level,
]) => {
  const goomba = entityFactories.goomba()
  goomba.pos.x = 224
  level.entities.add(goomba)

  const koopa = entityFactories.koopa()
  koopa.pos.x = 264
  level.entities.add(koopa)

  const mario = entityFactories.mario()
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
