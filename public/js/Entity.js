import { Vec2, Vec4 } from "./math.js";
import BoundingBox from "./BoundingBox.js";
import AudioBoard from "./AudioBoard.js";

export const Sides = {
  TOP: Symbol("top"),
  BOTTOM: Symbol("bottom"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};

export class Trait {
  constructor(name) {
    this.NAME = name;

    this.tasks = [];
  }

  finalise() {
    this.tasks.forEach((task) => task());
    this.tasks.length = 0;
  }

  queue(task) {
    this.tasks.push(task);
  }

  collides(us, them) {}

  obstruct(entity, side, match) {}

  update(entity, gameContext, level) {}
}

export default class Entity {
  constructor() {
    this.audioBoard = new AudioBoard();

    this.lifetime = 0;

    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec4(2, 2, 2, 2);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  collides(candidate) {
    this.traits.forEach((trait) => {
      trait.collides(this, candidate);
    });
  }

  obstruct(side, match) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match);
    });
  }

  draw() {}

  finalise() {
    this.traits.forEach((trait) => trait.finalise());
  }

  update(gameContext, level) {
    this.lifetime += gameContext.deltaTime;

    this.traits.forEach((trait) => {
      trait.update(this, gameContext, level);
    });
  }
}
