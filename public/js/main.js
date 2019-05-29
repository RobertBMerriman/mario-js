import Camera from './Camera.js';
import Timer from './Timer.js';
import {setupKeyboard} from './input.js';
import { loadEntities } from './entities.js'
import { createLevelLoader } from './loaders/level.js'
import Entity from './Entity.js'
import PlayerController from './traits/PlayerController.js'

// Ep 12 - 37:45

function createPlayerEnv(playerEntity) {
  const playerEnv = new Entity()
  const playerControl = new PlayerController()
  playerControl.setPlayer(playerEntity)
  playerControl.checkpoint.set(64, 64)
  playerEnv.addTrait(playerControl)
  return playerEnv
}

async function main(canvas) {
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  const camera = new Camera();

  const entityFactory = await loadEntities()
  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-1', camera)

  const mario = entityFactory.mario()

  const playerEnv = createPlayerEnv(mario)
  level.entities.add(playerEnv);

  const input = setupKeyboard(mario);
  input.listenTo(window);


  const deltaTime = 1/60;
  const timer = new Timer(deltaTime);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    camera.pos.x = Math.min(Math.max(0, Math.floor(mario.pos.x) - 100), 3100)

    level.compositor.draw(context, camera);
  }

  timer.start();
}

const canvas = document.getElementById('screen');
main(canvas)
