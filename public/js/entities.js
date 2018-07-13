import Entity from './Entity.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
  return loadMarioSprite()
  .then(marioSprite => {
    const mario = new Entity();

    mario.size.set(12, 14);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    //mario.addTrait(new Velocity());

    mario.draw = function drawMario(context) {
      marioSprite.draw('idle', context, 0, 0);
    }

    return mario;
  })
}
