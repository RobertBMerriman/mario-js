import {Trait} from '../Entity.js';

export default class Go extends Trait{
  constructor() {
    super('go');

    this.dir = 0;
    this.acceleration = 800;
    this.decceleration = 300;
    this.dragFactor = 1/3000;

    this.distance = 0;
    this.heading = 1;
  }

  update(entity, deltaTime) {
    if (this.dir !== 0) {
      this.heading = this.dir;
      entity.vel.x += this.acceleration * deltaTime * this.dir;
    } else if (entity.vel.x !== 0) {
      const decel = Math.min(Math.abs(entity.vel.x), this.decceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
    entity.vel.x -= drag;

    this.distance += Math.abs(entity.vel.x) * deltaTime;
  }
}
