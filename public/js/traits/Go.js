import { Trait } from "../Entity.js";

export default class Go extends Trait {
  constructor() {
    super("go");

    this.dir = 0;
    this.acceleration = 800;
    this.decceleration = 300;

    this.walkDrag = 1 / 1400;
    this.runDrag = 1 / 4500;
    this.dragFactor = this.walkDrag;

    this.distance = 0;
    this.heading = 1;
  }

  update(entity, { deltaTime }) {
    if (this.dir !== 0) {
      entity.vel.x += this.acceleration * deltaTime * this.dir;

      if (entity.jump) {
        if (!entity.jump.jumping) {
          this.heading = this.dir;
        }
      } else {
        this.heading = this.dir;
      }
    } else if (entity.vel.x !== 0) {
      const decel = Math.min(Math.abs(entity.vel.x), this.decceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
    entity.vel.x -= drag;

    const falling = entity.jump && !entity.jump.jumping && entity.vel.y > entity.jump.velocity;
    this.distance += falling ? 0 : Math.abs(entity.vel.x) * deltaTime;
  }
}
