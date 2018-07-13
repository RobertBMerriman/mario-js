import Level from './Level.js'
import {createBackgroundLayer, createSpriteLayer, createCollisionLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';


export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function createTiles(level, backgrounds) {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([xStart, xEnd, yStart, yEnd]) => {
      for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
          level.tiles.set(x, y, {
            name: background.tile,
          });
        }
      }
    });
  });
}

export function loadLevel(name) {
  return Promise.all([
    fetch(`/levels/${name}.json`).then(result => result.json()),
    loadBackgroundSprites(),
  ]).then(([
    levelSpec,
    backgroundSprites,
  ]) => {
      const level = new Level();

      createTiles(level, levelSpec.backgrounds);

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.compositor.layers.push(backgroundLayer);

      level.compositor.layers.push(createCollisionLayer(level));

      const spriteLayer = createSpriteLayer(level.entities);
      level.compositor.layers.push(spriteLayer);

      return level;
    });
}
