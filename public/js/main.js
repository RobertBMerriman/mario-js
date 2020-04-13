import Camera from "./Camera.js";
import Timer from "./Timer.js";
import { setupKeyboard, setupMouse } from "./input.js";
import { loadEntities } from "./entities.js";
import { createLevelLoader } from "./loaders/level.js";
import PlayerController from "./traits/PlayerController.js";
import { createCameraLayer } from "./layers/camera.js";
import { createCollisionLayer } from "./layers/collision.js";
import { createDashboardLayer } from "./layers/dashboard.js";
import { loadImage } from "./loaders.js";
import Button from "./ui/Button.js";
import { createUiLayer } from "./layers/ui.js";
import Text from "./ui/Text.js";

const defaultFontName = "SMBNES";
const defaultFontSize = 8;
export function font(sizeMultiplier = 1) {
  return `${defaultFontSize * sizeMultiplier}px ${defaultFontName}`;
}

function isDebug() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("debug");
  return myParam !== null;
}

function createPlayerEnv(playerEntity) {
  const playerControl = new PlayerController();
  playerControl.setPlayer(playerEntity);
  playerControl.checkpoint.set(64, 64);
  return playerControl;
}

async function main(canvas) {
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  context.font = font();
  context.textBaseline = "top";

  const camera = new Camera();

  const entityFactory = await loadEntities();
  const mario = entityFactory.mario();
  const playerController = createPlayerEnv(mario);

  const loadLevel = createLevelLoader(entityFactory);
  const level = await loadLevel("1-1", camera, playerController);

  const coinImg = await loadImage("/img/coin_counter.png");

  if (isDebug()) {
    level.compositor.layers.push(createCollisionLayer(level), createCameraLayer(camera));
  }

  level.compositor.layers.push(createDashboardLayer(playerController, coinImg));

  const keyboard = setupKeyboard(mario);
  keyboard.listenTo(window);

  const deltaTime = 1 / 60;
  const timer = new Timer(deltaTime);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.compositor.draw(context, camera);
  };

  const cameraMidX = camera.size.x / 2;
  const cameraCloseToBottom = camera.size.y - camera.size.y / 4;
  const playBtn = new Button(cameraMidX, cameraCloseToBottom, 60, 30, "Play", "green", () => {
    uiElements.length = 0;
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.compositor.draw(context, camera);
    };
  });
  const cameraMidY = camera.size.y / 2;
  const cameraLilAboveMid = cameraMidY - camera.size.y / 8;
  const marioText = new Text(cameraMidX, cameraLilAboveMid, "EXTREMELY Morio", "#E52521", 2);
  const jxText = new Text(cameraMidX, cameraLilAboveMid + 28, "JX", "#E52521", 3);

  const uiElements = [playBtn, marioText, jxText];
  level.compositor.layers.push(createUiLayer(uiElements));

  setupMouse(canvas, uiElements);

  timer.start();
}

const canvas = document.getElementById("screen");
main(canvas);
