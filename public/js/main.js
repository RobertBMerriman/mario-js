import Camera from './Camera.js';
import Timer from './Timer.js';
import {setupKeyboard} from './input.js';
import { loadEntities } from './entities.js'
import { createLevelLoader } from './loaders/level.js'

// Ep 12????? RUSHITTINGME???????????????????


async function main(canvas) {
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  const camera = new Camera();

  const entityFactory = await loadEntities()
  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-1', camera)


  const mario = entityFactory.mario()
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
}

const canvas = document.getElementById('screen');
main(canvas)
