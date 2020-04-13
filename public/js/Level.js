import Compositor from "./Compositor.js";
import TileCollider from "./TileCollider.js";
import EntityCollider from "./EntityCollider.js";

export default class Level {
  constructor(camera, playerController, width, height) {
    camera.setLevelSize(width, height);
    this.camera = camera;
    this.playerController = playerController;
    this.width = width;
    this.height = height;

    this.gravity = 1500;
    this.totalTime = 0;

    this.compositor = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities);
    this.tileCollider = null;
  }

  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime) {
    this.totalTime += deltaTime;

    this.entities.forEach((entity) => {
      if (this.camera.contains(entity)) {
        entity.update(deltaTime, this);
      }
      if (entity.pos.y > this.height) {
        entity.killable.kill();
      }
      if (entity.bounds.left < 0) {
        entity.solid.stop(entity);
        entity.bounds.left = 0.2;
      } else if (entity.bounds.right > this.width) {
        entity.solid.stop(entity);
        entity.bounds.right = this.width - 0.2;
      }
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });

    this.entities.forEach((entity) => entity.finalise());

    this.playerController.update(deltaTime, this);
    this.camera.update(this.playerController.player);
  }
}
