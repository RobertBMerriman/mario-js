import { Vec2, Vec4 } from './math.js';
import BoundingBox from './BoundingBox.js'

export default class Camera {

  constructor() {
    this.pos = new Vec2(0, 0);
    this.size = new Vec2(256, 240);
    this.offset = new Vec4(-32, -32, -32, -32);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset)

    this.playerTrackingX = 100

    this.levelWidth = 3000
    this.levelHeight = 256
  }

  contains(entity) {
    return this.bounds.overlaps(entity.bounds)
  }

  update(player) {
    this.pos.x = Math.min(Math.max(0, Math.floor(player.pos.x) - this.playerTrackingX), this.levelWidth)
  }

  setLevelSize(width, height) {
    this.levelWidth = width - this.size.x
    this.levelHeight = height
  }

}
