import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';
import EntityCollider from './EntityCollider.js'

export default class Level {

  constructor(camera, playerController) {
    this.camera = camera
    this.playerController = playerController

    this.gravity = 1500;
    this.totalTime = 0;

    this.compositor = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities)
    this.tileCollider = null;

  }

  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix)
  }

  update(deltaTime) {
    this.totalTime += deltaTime;

    this.entities.forEach(entity => {
      if (this.camera.contains(entity)) {
        entity.update(deltaTime, this);
      }
    })

    this.entities.forEach(entity => {
      this.entityCollider.check(entity)
    });

    this.entities.forEach(entity => entity.finalise())

    this.playerController.update(deltaTime, this)
    this.camera.update(this.playerController.player)
  }

}
