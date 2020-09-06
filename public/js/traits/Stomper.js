import { Trait } from "../Entity.js";

export default class Stomper extends Trait {
  constructor() {
    super("stomper");
    this.bounceSpeed = 400;
    this.didStomp = false;
  }

  bounce(us, them) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
    this.didStomp = true;

    us.score += 100;
  }

  collides(us, them) {
    if (!them.killable || them.killable.dead) return;

    if (us.vel.y > them.vel.y) {
      this.bounce(us, them);
    }
  }

  update(entity, { audioContext }) {
    if (this.didStomp) {
      entity.audio && entity.audio.play("stomp", audioContext);
      this.didStomp = false;
    }
  }
}
