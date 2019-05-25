import Entity from '../Entity.js';
import Jump from '../traits/Jump.js';
import Go from '../traits/Go.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadMario() {
  return loadSpriteSheet('mario')
    .then(createMarioFactory)
}

function createMarioFactory(sprite) {

  const runAnim = sprite.animations.get('run')

  function routeFrame(mario) {
    if (mario.jump.jumping) {
      return 'jump';
    }

    if (mario.go.distance > 0) {
      if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
        return 'brake';
      }
      return runAnim(mario.go.distance);
    }

    return 'idle';
  }

  function drawMario(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  }

  return function createMario() {
    const mario = new Entity();
    mario.size.set(12, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    mario.draw = drawMario

    return mario;
  }
}
