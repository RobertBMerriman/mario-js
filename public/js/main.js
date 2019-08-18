import Camera from './Camera.js';
import Timer from './Timer.js';
import {setupKeyboard} from './input.js';
import { loadEntities } from './entities.js'
import { createLevelLoader } from './loaders/level.js'
import PlayerController from './traits/PlayerController.js'
import { createCameraLayer } from './layers/camera.js'
import { createCollisionLayer } from './layers/collision.js'
import { createDashboardLayer } from './layers/dashboard.js'
import { loadImage } from './loaders.js'



function isDebug() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('debug');
  return myParam !== null
}

function createPlayerEnv(playerEntity) {
  const playerControl = new PlayerController()
  playerControl.setPlayer(playerEntity)
  playerControl.checkpoint.set(64, 64)
  return playerControl
}

async function main(canvas) {
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  context.font = '8px SMBNES'
  context.textBaseline = 'top';

  const camera = new Camera();

  const entityFactory = await loadEntities()
  const mario = entityFactory.mario()
  const playerController = createPlayerEnv(mario)

  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-1', camera, playerController)

  const coinImg = await loadImage('/img/coin_counter.png')

  if (isDebug()) {
    level.compositor.layers.push(
      createCollisionLayer(level),
      createCameraLayer(camera),
    )
  }

  level.compositor.layers.push(
    createDashboardLayer(playerController, coinImg),
  );

  const input = setupKeyboard(mario);
  input.listenTo(window);


  const deltaTime = 1/60;
  const timer = new Timer(deltaTime);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.compositor.draw(context, camera);
  }

  timer.start();
}

const canvas = document.getElementById('screen');
main(canvas)
