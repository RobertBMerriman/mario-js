import { Trait } from "../Entity.js";

export default class Stomper extends Trait {
  constructor() {
    super("stomper");
    this.bounceSpeed = 400;
  }

  bounce(us, them) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
    this.queueBounce = true;

    us.score += 100;
  }

  collides(us, them) {
    if (!them.killable || them.killable.dead) return;

    if (us.vel.y > them.vel.y) {
      this.bounce(us, them);
    }
  }

  update(entity) {
    if (this.queueBounce) {
      this.queueBounce = false;
    }
  }
}
