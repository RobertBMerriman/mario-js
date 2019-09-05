import {Trait, Sides} from '../Entity.js';

export default class Solid extends Trait {
  constructor() {
    super('solid');

    this.obstructs = true
  }

  obstruct(entity, side, match) {
    if (!this.obstructs) return

    if (side === Sides.BOTTOM) {
      entity.bounds.bottom = match.y1;
      entity.vel.y = 0;
    } else if (side === Sides.TOP) {
      entity.bounds.top = match.y2;
      entity.vel.y = 0;
    } else if (side === Sides.RIGHT) {
      entity.bounds.right = match.x1;
      this.stop(entity)
    } else if (side === Sides.LEFT) {
      entity.bounds.left = match.x2;
      this.stop(entity)
    }
  }

  stop(entity) {
    entity.vel.x = 0;
    if (entity.go)
      entity.go.distance = 0
  }
}
