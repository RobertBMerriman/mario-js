import Entity from "../Entity.js";
import { loadSpriteSheet } from "../loaders.js";
import Jump from "../traits/Jump.js";
import Go from "../traits/Go.js";
import Stomper from "../traits/Stomper.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Physics from "../traits/Physics.js";
import { loadAudioBoard } from "../loaders/audio.js";

export function loadMario(audioContext) {
  return Promise.all([loadSpriteSheet("mario"), loadAudioBoard("mario", audioContext)]).then(([sprite, audioBoard]) =>
    createMarioFactory(sprite, audioBoard)
  );
}

function createMarioFactory(sprite, audioBoard) {
  const runAnim = sprite.animations.get("run");

  function routeFrame(mario) {
    if (mario.jump.jumping) {
      return "jump";
    }

    if (mario.go.distance > 0) {
      if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
        return "brake";
      }
      if (mario.go.distance < 0.5) {
        return "idle";
      }
      return runAnim(mario.go.distance);
    }

    return "idle";
  }

  function drawMario(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  }

  return function createMario() {
    const mario = new Entity();
    mario.audio = audioBoard;
    mario.size.set(12, 16);
    mario.offset.set(2, 2, 2, 0);
    mario.score = 0;
    mario.coins = 79;

    mario.addTrait(new Solid());
    mario.addTrait(new Physics());
    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    mario.addTrait(new Stomper());
    mario.addTrait(new Killable());
    mario.killable.removeAfter = 0;

    mario.draw = drawMario;

    return mario;
  };
}
