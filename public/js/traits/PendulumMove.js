import { Trait, Sides } from "../Entity.js";

export default class PendulumMove extends Trait {
  constructor() {
    super("pendulumMove");

    this.initialSpeed = 30;
    this.heading = -1;
    this.resetSpeed();

    this.enabled = true;
  }

  resetSpeed() {
    this.speed = this.initialSpeed;
  }

  obstruct(entity, side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.heading = -this.heading;
    }
  }

  update(entity) {
    if (this.enabled) {
      entity.vel.x = this.speed * this.heading;
    }
  }
}
