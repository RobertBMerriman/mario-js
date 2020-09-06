import { loadMario } from "./entities/Mario.js";
import { loadGoomba } from "./entities/Goomba.js";
import { loadKoopa } from "./entities/Koopa.js";

export function loadEntities(audioContext) {
  function addAs(name) {
    return (factory) => (entityFactory[name] = factory);
  }

  const entityFactory = {};

  return Promise.all([
    loadMario(audioContext).then(addAs("mario")),
    loadGoomba(audioContext).then(addAs("goomba")),
    loadKoopa(audioContext).then(addAs("koopa")),
  ]).then(() => entityFactory);
}
