import { Trait } from "../Entity.js";

export default class Physics extends Trait {
  constructor() {
    super("physics");

    this.obstructs = true;
  }

  update(entity, { deltaTime }, level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider.checkY(entity);

    if (!entity.floating) entity.vel.y += level.gravity * deltaTime;
  }
}
