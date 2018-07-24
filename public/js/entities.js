import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import {loadSpriteSheet} from './loaders.js';

export function createMario() {
  return loadSpriteSheet('mario')
  .then(marioSprite => {

    const mario = new Entity();
    mario.size.set(12, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    mario.draw = function drawMario(context) {
      marioSprite.draw('idle', context, 0, 0);
    };

    return mario;
  })
}
