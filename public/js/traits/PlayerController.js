import { Vec2 } from '../math.js'

export default class PlayerController {
  constructor() {
    this.player = null
    this.checkpoint = new Vec2(0, 0)
    this.initalTime = 300

    this.time = this.initalTime
  }

  setPlayer(entity) {
    this.player = entity
  }

  update (deltaTime, level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive()
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y)
      level.entities.add(this.player)
    } else {
      this.time -= deltaTime * 2
      if (this.time <= 0) {
        this.player.killable.kill()
        this.time = this.initalTime
      }
    }
  }
}
